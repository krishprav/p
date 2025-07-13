'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useWorkflowStore } from '@/store/workflow-store'
import { generateWorkflow } from '@/lib/api'
import { Sparkles, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const examplePrompts = [
  'When I get an email, summarize it with ChatGPT and send to Slack',
  'Create a workflow that monitors Twitter mentions and saves them to a Google Sheet',
  'When a new lead is added to Airtable, send them a welcome email via Mailchimp',
  'Monitor a website for changes and notify me on Telegram',
  'When I receive a payment via Stripe, create a task in ClickUp'
]

export function PromptForm() {
  const [prompt, setPrompt] = useState('')
  const { setCurrentWorkflow, setLoading, setError, addToHistory } = useWorkflowStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await generateWorkflow(prompt)
      setCurrentWorkflow(response)
      addToHistory(prompt, response.workflow)
      toast.success('Workflow generated successfully!')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate workflow'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          PromptFlow
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Build n8n workflows by just describing them in plain English
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your workflow in plain English... For example: 'When I get an email, summarize it with ChatGPT and send to Slack'"
            className="min-h-[120px] text-lg"
            disabled={useWorkflowStore.getState().isLoading}
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            disabled={!prompt.trim() || useWorkflowStore.getState().isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
          >
            {useWorkflowStore.getState().isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Workflow
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Try these examples:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm text-gray-600 hover:text-gray-800"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}