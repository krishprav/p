import { GenerateWorkflowRequest, GenerateWorkflowResponse, WorkflowTemplate, N8nWorkflow } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function generateWorkflow(prompt: string): Promise<GenerateWorkflowResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt } as GenerateWorkflowRequest),
    })

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Failed to generate workflow')
  }
}

export async function getTemplates(): Promise<WorkflowTemplate[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/templates`)
    
    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Failed to fetch templates')
  }
}

export async function getTemplate(id: string): Promise<WorkflowTemplate> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/templates/${id}`)
    
    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Failed to fetch template')
  }
}

// Mock data for development
export const mockTemplates: WorkflowTemplate[] = [
  {
    id: '1',
    title: 'Email to Slack Notification',
    description: 'When you receive an email, send a notification to Slack',
    tags: ['email', 'slack', 'notification'],
    json: {
      name: 'Email to Slack',
      nodes: [
        {
          id: 'email-trigger',
          name: 'Email Trigger',
          type: 'n8n-nodes-base.emailTrigger',
          typeVersion: 1,
          position: [240, 300],
          parameters: {}
        },
        {
          id: 'slack-send',
          name: 'Send to Slack',
          type: 'n8n-nodes-base.slack',
          typeVersion: 1,
          position: [460, 300],
          parameters: {
            operation: 'postMessage',
            channel: '{{ $json.channel }}',
            text: 'New email received: {{ $json.subject }}'
          }
        }
      ],
      connections: {
        'Email Trigger': {
          main: [
            [
              {
                node: 'Send to Slack',
                type: 'main',
                index: 0
              }
            ]
          ]
        }
      },
      active: true,
      settings: {},
      versionId: '1',
      meta: {
        templateCredsSetupCompleted: true
      },
      tags: ['email', 'slack']
    },
    createdAt: '2024-01-01T00:00:00Z',
    usageCount: 150
  },
  {
    id: '2',
    title: 'AI Content Summarizer',
    description: 'Use ChatGPT to summarize content and save to Notion',
    tags: ['ai', 'notion', 'productivity'],
    json: {
      name: 'AI Content Summarizer',
      nodes: [
        {
          id: 'webhook-trigger',
          name: 'Webhook Trigger',
          type: 'n8n-nodes-base.webhook',
          typeVersion: 1,
          position: [240, 300],
          parameters: {}
        },
        {
          id: 'openai-summarize',
          name: 'Summarize with OpenAI',
          type: 'n8n-nodes-base.openAi',
          typeVersion: 1,
          position: [460, 300],
          parameters: {
            operation: 'completion',
            model: 'gpt-3.5-turbo',
            prompt: 'Summarize this content: {{ $json.content }}'
          }
        },
        {
          id: 'notion-create',
          name: 'Create Notion Page',
          type: 'n8n-nodes-base.notion',
          typeVersion: 1,
          position: [680, 300],
          parameters: {
            operation: 'create',
            databaseId: '{{ $json.databaseId }}',
            title: '{{ $json.title }}',
            content: '{{ $json.summary }}'
          }
        }
      ],
      connections: {
        'Webhook Trigger': {
          main: [
            [
              {
                node: 'Summarize with OpenAI',
                type: 'main',
                index: 0
              }
            ]
          ]
        },
        'Summarize with OpenAI': {
          main: [
            [
              {
                node: 'Create Notion Page',
                type: 'main',
                index: 0
              }
            ]
          ]
        }
      },
      active: true,
      settings: {},
      versionId: '1',
      meta: {
        templateCredsSetupCompleted: true
      },
      tags: ['ai', 'notion']
    },
    createdAt: '2024-01-01T00:00:00Z',
    usageCount: 89
  }
]