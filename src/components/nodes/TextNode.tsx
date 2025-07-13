import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';
interface TextNodeData {
    label: string;
  }
/**
 * TextNode component - Represents a text message node in the flow
 * Features:
 * - Source handle (right) - can only have one outgoing connection
 * - Target handle (left) - can have multiple incoming connections
 * - Displays the message text
 * - Visual styling matches the design requirements
*/
const TextNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as TextNodeData;
  
  return (
    <div className={`
      bg-white border-2 rounded-lg shadow-sm min-w-[200px] max-w-[300px]
      ${selected ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'}
      transition-all duration-200
    `}>
      {/* Target Handle - Left */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors cursor-crosshair"
      />
      
      {/* Node Header */}
      <div className="bg-teal-400 text-white px-4 py-2 rounded-t-md flex items-center gap-2">
        <MessageSquare size={16} />
        <span className="font-medium text-sm">Send Message</span>
      </div>
      
      {/* Node Content */}
      <div className="p-4">
        <div className="text-sm text-gray-700 break-words">
          {nodeData.label || 'text message'}
        </div>
      </div>
        
        {/* Source Handle - Right */}
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 bg-gray-400 border-2 border-white hover:bg-gray-500 transition-colors"
        />
      </div>
    );
  };
  
  export default memo(TextNode);