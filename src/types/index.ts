export interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  tags: string[];
  json: object;
  createdAt: string;
  usageCount?: number;
}

export interface UserWorkflow {
  id: string;
  userId: string;
  prompt: string;
  workflowJson: object;
  createdAt: string;
  updatedAt: string;
}

export interface N8nNode {
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters: Record<string, any>;
}

export interface N8nConnection {
  from: {
    node: string;
    type: number;
    index: number;
  };
  to: {
    node: string;
    type: number;
    index: number;
  };
}

export interface N8nWorkflow {
  name: string;
  nodes: N8nNode[];
  connections: Record<string, N8nConnection[][]>;
  active: boolean;
  settings: Record<string, any>;
  versionId: string;
  meta: {
    templateCredsSetupCompleted: boolean;
  };
  tags: string[];
}

export interface GenerateWorkflowRequest {
  prompt: string;
  userId?: string;
}

export interface GenerateWorkflowResponse {
  workflow: N8nWorkflow;
  explanation: string;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ApiError {
  message: string;
  code: string;
}

export type WorkflowCategory = 
  | 'email'
  | 'slack'
  | 'ai'
  | 'marketing'
  | 'productivity'
  | 'data'
  | 'webhooks'
  | 'social'
  | 'crm'
  | 'ecommerce';