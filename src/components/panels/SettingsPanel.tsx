import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import type { Node } from '@xyflow/react';

interface SettingsPanelProps {
  node: Node;
  onUpdateNode: (nodeId: string, newData: any) => void;
  onClose: () => void;
}

/**
 * SettingsPanel component - Allows editing of selected node properties
 * Features:
 * - Text editing for message nodes
 * - Extensible design for different node types
 * - Auto-save functionality
 * - Back button to return to nodes panel
 */
const SettingsPanel: React.FC<SettingsPanelProps> = ({ node, onUpdateNode, onClose }) => {
    const [text, setText] = useState<string>((node.data as { label?: string }).label || '');
  
    // Update local state when node changes
    useEffect(() => {
      setText((node.data as { label?: string }).label || '');
    }, [node.data]);
  
    // Handle text change with auto-save
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = event.target.value;
      setText(newText);
      onUpdateNode(node.id, { label: newText });
    };
  
    // Render settings based on node type
    const renderNodeSettings = () => {
      switch (node.type) {
        case 'textNode':
          return (
            <div className="space-y-4">
              <div>
                <label htmlFor="message-text" className="block text-sm font-medium text-gray-700 mb-2">
                  Text
                </label>
                <textarea
                  id="message-text"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Enter your message here..."
                  className="
                    w-full p-3 border border-gray-300 rounded-md
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    resize-none min-h-[100px]
                    transition-all duration-200
                  "
                  rows={4}
                />
              </div>
              
              <div className="text-xs text-gray-500">
                <p>💡 This message will be sent to users when they reach this node in the flow.</p>
              </div>
            </div>
          );
        
        default:
          return (
            <div className="text-center py-8">
              <p className="text-gray-500">No settings available for this node type.</p>
            </div>
          );
      }
    };
  
    return (
      <div className="h-full flex flex-col">
        {/* Panel Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="
                p-2 hover:bg-gray-100 rounded-md
                transition-colors duration-200
                flex items-center justify-center
              "
              aria-label="Back to nodes panel"
            >
              <ArrowLeft size={16} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Message</h2>
            </div>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="flex-1 p-4">
          {renderNodeSettings()}
        </div>
        
        {/* Node Info */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Node ID:</strong> {node.id}</p>
            <p><strong>Type:</strong> {node.type}</p>
            <p><strong>Position:</strong> ({Math.round(node.position.x)}, {Math.round(node.position.y)})</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default SettingsPanel;