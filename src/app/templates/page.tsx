'use client'

import { useState, useEffect } from 'react'
import { TemplateCard } from '@/components/template-card'
import { WorkflowTemplate, WorkflowCategory } from '@/types'
import { mockTemplates } from '@/lib/api'
import { Search, Filter } from 'lucide-react'

const categories: WorkflowCategory[] = [
  'email', 'slack', 'ai', 'marketing', 'productivity', 
  'data', 'webhooks', 'social', 'crm', 'ecommerce'
]

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<WorkflowTemplate[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<WorkflowCategory | 'all'>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from the API
    setTemplates(mockTemplates)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let filtered = templates

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template =>
        template.tags.includes(selectedCategory)
      )
    }

    setFilteredTemplates(filtered)
  }, [templates, searchTerm, selectedCategory])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading templates...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Workflow Templates</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready-to-use n8n workflows for common automation tasks
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
            </h2>
            {searchTerm || selectedCategory !== 'all' ? (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}