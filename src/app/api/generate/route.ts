import { NextRequest, NextResponse } from 'next/server'
import { GenerateWorkflowResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Mock response for development
    // In production, this would call OpenAI API
    const mockResponse: GenerateWorkflowResponse = {
      workflow: {
        name: `Workflow for: ${prompt}`,
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
            id: 'http-request',
            name: 'HTTP Request',
            type: 'n8n-nodes-base.httpRequest',
            typeVersion: 1,
            position: [460, 300],
            parameters: {
              method: 'GET',
              url: 'https://api.example.com/data'
            }
          },
          {
            id: 'slack-send',
            name: 'Send to Slack',
            type: 'n8n-nodes-base.slack',
            typeVersion: 1,
            position: [680, 300],
            parameters: {
              operation: 'postMessage',
              channel: '{{ $json.channel }}',
              text: '{{ $json.message }}'
            }
          }
        ],
        connections: {
          'Webhook Trigger': {
            main: [
              [
                {
                  node: 'HTTP Request',
                  type: 'main',
                  index: 0
                }
              ]
            ]
          },
          'HTTP Request': {
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
        tags: ['webhook', 'slack']
      },
      explanation: `This workflow creates a webhook endpoint that receives data, makes an HTTP request to process it, and then sends a notification to Slack. The workflow is triggered when data is sent to the webhook URL.`,
      estimatedTime: '5-10 minutes',
      difficulty: 'easy'
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error('Error generating workflow:', error)
    return NextResponse.json(
      { error: 'Failed to generate workflow' },
      { status: 500 }
    )
  }
}