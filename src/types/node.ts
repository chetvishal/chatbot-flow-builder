/**
 * Type definitions for node data structures
 * This file centralizes all node-related types for better maintainability
 */

export interface NodeData {
    label: string;
    [key: string]: any;
  }
  
  export interface TextNodeData extends NodeData {
    label: string;
  }
  
  // Future node types can be added here
  // export interface ConditionNodeData extends NodeData {
  //   condition: string;
  //   trueLabel: string;
  //   falseLabel: string;
  // }
  
  export type NodeType = 'textNode'; // | 'conditionNode' | 'actionNode' etc.