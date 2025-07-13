import React from 'react';
import { MessageSquare } from 'lucide-react';

/**
 * NodesPanel component - Displays available node types for drag and drop
 * Features:
 * - Extensible design for adding new node types
 * - Drag and drop functionality
 * - Visual representation of available nodes
 */
const NodesPanel: React.FC = () => {
    // Handle drag start for node types
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };
  
    // Configuration for available node types
    const nodeTypes = [
      {
        type: 'textNode',
        label: 'Message',
        icon: MessageSquare,
        description: 'Send a text message',
      },
      // Future node types can be added here
      // {
      //   type: 'conditionNode',
      //   label: 'Condition',
      //   icon: GitBranch,
      //   description: 'Add conditional logic',
      // },
    ];
  
    return (
      <div className="h-full flex flex-col">
        {/* Panel Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Nodes Panel</h2>
          <p className="text-sm text-gray-600 mt-1">
            Drag and drop nodes to build your flow
          </p>
        </div>
        
        {/* Node Types List */}
        <div className="flex-1 p-4 space-y-3">
          {nodeTypes.map((nodeType) => {
            const IconComponent = nodeType.icon;
            
            return (
              <div
                key={nodeType.type}
                draggable
                onDragStart={(e) => onDragStart(e, nodeType.type)}
                className="
                  border-2 border-dashed border-gray-300 rounded-lg p-4 
                  cursor-grab active:cursor-grabbing
                  hover:border-blue-400 hover:bg-blue-50
                  transition-all duration-200
                  flex flex-col items-center gap-2
                "
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <IconComponent size={24} className="text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-800">{nodeType.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{nodeType.description}</div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Instructions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-600 leading-relaxed">
            💡 <strong>Tip:</strong> Drag nodes onto the canvas to start building your chatbot flow. 
            Connect nodes by dragging from the bottom handle to the top handle of another node.
          </p>
        </div>
      </div>
    );
  };
  
  export default NodesPanel;