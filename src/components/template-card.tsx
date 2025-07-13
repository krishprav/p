'use client'

import { WorkflowTemplate } from '@/types'
import { Button } from '@/components/ui/button'
import { downloadJson, copyToClipboard, formatDate } from '@/lib/utils'
import { Download, Copy, ExternalLink, Users } from 'lucide-react'
import toast from 'react-hot-toast'

interface TemplateCardProps {
  template: WorkflowTemplate
}

export function TemplateCard({ template }: TemplateCardProps) {
  const handleCopyJson = async () => {
    try {
      await copyToClipboard(JSON.stringify(template.json, null, 2))
      toast.success('Template copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy template')
    }
  }

  const handleDownloadJson = () => {
    const filename = `${template.title.replace(/\s+/g, '-').toLowerCase()}.json`
    downloadJson(template.json, filename)
    toast.success('Template downloaded!')
  }

  const handleUseTemplate = () => {
    // This would typically pre-fill the prompt form with the template description
    // For now, we'll just copy the JSON
    handleCopyJson()
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4 hover:shadow-md transition-shadow">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
        <p className="text-gray-600 text-sm">{template.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {template.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Created {formatDate(template.createdAt)}</span>
        {template.usageCount && (
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{template.usageCount} uses</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <Button onClick={handleUseTemplate} size="sm" className="bg-blue-600 hover:bg-blue-700">
          <ExternalLink className="mr-2 h-4 w-4" />
          Use Template
        </Button>
        <Button onClick={handleDownloadJson} size="sm" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button onClick={handleCopyJson} size="sm" variant="ghost">
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
      </div>
    </div>
  )
}