'use client'

import { PromptForm } from '@/components/prompt-form'
import { WorkflowPreview } from '@/components/workflow-preview'
import { useWorkflowStore } from '@/store/workflow-store'
import { Toaster } from 'react-hot-toast'

export default function HomePage() {
  const { currentWorkflow, isLoading, error } = useWorkflowStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!currentWorkflow ? (
            <PromptForm />
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <button
                  onClick={() => useWorkflowStore.getState().setCurrentWorkflow(null)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  ← Generate another workflow
                </button>
              </div>
              <WorkflowPreview />
            </div>
          )}
        </div>
      </main>

      {/* Error Display */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
    </div>
  )
}
