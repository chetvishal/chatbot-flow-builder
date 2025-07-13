import React, { useState, useCallback, useRef } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    ReactFlowProvider,
    MarkerType
} from '@xyflow/react';
import type {
    Connection,
    Edge,
    Node,
    ReactFlowInstance,
    OnConnect,
    OnConnectStart,
    OnConnectEnd,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TextNode from './nodes/TextNode';
import NodesPanel from './panels/NodesPanel';
import SettingsPanel from './panels/SettingsPanel';
import SaveButton from './SaveButton';
import type { NodeData } from '../types/node';

// Custom node types
const nodeTypes = {
    textNode: TextNode,
  };
  
  // Initial nodes and edges
  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];
  
  const FlowBuilder: React.FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const connectingNodeId = useRef<string | null>(null);
  
    // Handle connection between nodes
    const onConnect: OnConnect = useCallback(
      (params: Connection) => {
        // Check if source already has a connection
        const existingEdge = edges.find(edge => edge.source === params.source);
        if (existingEdge) {
          // Remove existing edge before adding new one
          setEdges(edges => edges.filter(edge => edge.source !== params.source));
        }
        
        // Add edge with arrow marker
        const newEdge = {
          ...params,
          style: { stroke: '#acacac' },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#acacac',
          },
        };
        setEdges(edges => addEdge(newEdge, edges));
      },
      [edges, setEdges]
    );
  
    // Handle start of connection
    const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
      connectingNodeId.current = nodeId;
    }, []);
  
    // Handle end of connection
    const onConnectEnd: OnConnectEnd = useCallback(
      (event) => {
        if (!connectingNodeId.current) return;
        
        const targetIsPane = (event.target as Element).classList.contains('react-flow__pane');
        
        if (targetIsPane) {
          // Connection ended on pane, not on a node
          // Could add logic here to create a new node
        }
        
        connectingNodeId.current = null;
      },
      []
    );
  
    // Handle node selection
    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
    }, []);
  
    // Handle pane click to deselect nodes
    const onPaneClick = useCallback(() => {
      setSelectedNode(null);
    }, []);
  
    // Handle drag over for drop functionality
    const onDragOver = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);
  
    // Handle drop to add new nodes
    const onDrop = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault();
  
        const type = event.dataTransfer.getData('application/reactflow');
        if (typeof type === 'undefined' || !type) {
          return;
        }
  
        if (!reactFlowInstance) return;
  
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
  
        const newNode: Node = {
          id: `${type}-${Date.now()}`,
          type,
          position,
          data: {
            label: type === 'textNode' ? 'text message' : 'New Node',
          },
        };
  
        setNodes(nodes => nodes.concat(newNode));
      },
      [reactFlowInstance, setNodes]
    );
  
    // Update node data
    const updateNodeData = useCallback((nodeId: string, newData: Partial<NodeData>) => {
      setNodes(nodes =>
        nodes.map(node =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node
        )
      );
    }, [setNodes]);
  
    // Get nodes without target connections (for validation)
    const getNodesWithoutTargets = useCallback(() => {
      return nodes.filter(node => {
        return !edges.some(edge => edge.target === node.id);
      });
    }, [nodes, edges]);
  
    // Validate flow before saving
    const validateFlow = useCallback(() => {
      if (nodes.length <= 1) {
        return true; // No validation needed for single node or empty flow
      }
  
      const nodesWithoutTargets = getNodesWithoutTargets();
      return nodesWithoutTargets.length <= 1;
    }, [nodes, getNodesWithoutTargets]);
  
    // Save flow
    const saveFlow = useCallback(() => {
      if (!validateFlow()) {
        alert('Cannot save Flow: More than one node has empty target handles');
        return;
      }
  
      // Here you would typically save to a backend
      console.log('Flow saved successfully!', { nodes, edges });
      alert('Flow saved successfully!');
    }, [validateFlow, nodes, edges]);
  
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Main Flow Area */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            fitView
            className="bg-white"
          >
            <Controls />
            <Background color="#f1f5f9" gap={16} />
          </ReactFlow>
          
          {/* Save Button */}
          <SaveButton 
            onSave={saveFlow}
            isValid={validateFlow()}
          />
        </div>
  
        {/* Right Panel */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              onUpdateNode={updateNodeData}
              onClose={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>
    );
  };
  
  // Wrap with ReactFlowProvider
  const FlowBuilderWrapper: React.FC = () => (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
  
  export default FlowBuilderWrapper;