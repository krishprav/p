import { create } from 'zustand'
import { N8nWorkflow, GenerateWorkflowResponse } from '@/types'

interface WorkflowState {
  // Current workflow being generated
  currentWorkflow: GenerateWorkflowResponse | null
  isLoading: boolean
  error: string | null
  
  // Generation history
  history: Array<{
    id: string
    prompt: string
    workflow: N8nWorkflow
    createdAt: Date
  }>
  
  // User preferences
  autoSave: boolean
  showExplanations: boolean
  
  // Actions
  setCurrentWorkflow: (workflow: GenerateWorkflowResponse | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addToHistory: (prompt: string, workflow: N8nWorkflow) => void
  clearHistory: () => void
  setAutoSave: (enabled: boolean) => void
  setShowExplanations: (enabled: boolean) => void
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  currentWorkflow: null,
  isLoading: false,
  error: null,
  history: [],
  autoSave: true,
  showExplanations: true,
  
  setCurrentWorkflow: (workflow) => set({ currentWorkflow: workflow }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  addToHistory: (prompt, workflow) => {
    const history = get().history
    const newEntry = {
      id: Date.now().toString(),
      prompt,
      workflow,
      createdAt: new Date(),
    }
    set({ history: [newEntry, ...history.slice(0, 9)] }) // Keep last 10
  },
  
  clearHistory: () => set({ history: [] }),
  setAutoSave: (enabled) => set({ autoSave: enabled }),
  setShowExplanations: (enabled) => set({ showExplanations: enabled }),
}))