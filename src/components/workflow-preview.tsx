'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useWorkflowStore } from '@/store/workflow-store'
import { downloadJson, copyToClipboard, getDifficultyColor } from '@/lib/utils'
import { Download, Copy, ExternalLink, Eye, EyeOff } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import toast from 'react-hot-toast'

export function WorkflowPreview() {
  const { currentWorkflow, showExplanations } = useWorkflowStore()
  const [showJson, setShowJson] = useState(false)

  if (!currentWorkflow) return null

  const handleCopyJson = async () => {
    try {
      await copyToClipboard(JSON.stringify(currentWorkflow.workflow, null, 2))
      toast.success('JSON copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy JSON')
    }
  }

  const handleDownloadJson = () => {
    const filename = `${currentWorkflow.workflow.name.replace(/\s+/g, '-').toLowerCase()}.json`
    downloadJson(currentWorkflow.workflow, filename)
    toast.success('Workflow downloaded!')
  }

  const handleOpenInN8n = () => {
    // This would typically open the workflow in the user's n8n instance
    // For now, we'll just copy the JSON
    handleCopyJson()
    toast.success('JSON copied! Import this into your n8n instance.')
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{currentWorkflow.workflow.name}</h2>
            <p className="text-gray-600 mt-1">{currentWorkflow.explanation}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentWorkflow.difficulty)}`}>
              {currentWorkflow.difficulty}
            </span>
            <span className="text-sm text-gray-500">~{currentWorkflow.estimatedTime}</span>
          </div>
        </div>

        {showExplanations && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">What this workflow does:</h3>
            <p className="text-blue-800 text-sm">{currentWorkflow.explanation}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleDownloadJson} className="bg-green-600 hover:bg-green-700">
            <Download className="mr-2 h-4 w-4" />
            Download JSON
          </Button>
          <Button onClick={handleCopyJson} variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Copy JSON
          </Button>
          <Button onClick={handleOpenInN8n} variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in n8n
          </Button>
          <Button
            onClick={() => setShowJson(!showJson)}
            variant="ghost"
            size="sm"
          >
            {showJson ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {showJson ? 'Hide' : 'Show'} JSON
          </Button>
        </div>

        {showJson && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-700">Workflow JSON</span>
            </div>
            <div className="max-h-96 overflow-auto">
              <SyntaxHighlighter
                language="json"
                style={tomorrow}
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  fontSize: '14px',
                }}
              >
                {JSON.stringify(currentWorkflow.workflow, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 mb-2">How to use this workflow:</h3>
        <ol className="text-yellow-800 text-sm space-y-1 list-decimal list-inside">
          <li>Download the JSON file or copy the JSON content</li>
          <li>Open your n8n instance</li>
          <li>Go to Workflows → Import from File/URL</li>
          <li>Paste the JSON or upload the file</li>
          <li>Configure the credentials for each node</li>
          <li>Test and activate your workflow!</li>
        </ol>
      </div>
    </div>
  )
}