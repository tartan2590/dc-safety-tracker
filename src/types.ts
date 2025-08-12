export type Status = 'Not Started' | 'In Progress' | 'Completed' | 'Stalled'

export type Category =
  | 'Immediate'
  | 'Near-term (≤1 week)'
  | 'Short-term (no fixed date)'
  | 'Legislation/Appointments'
  | 'Replicable Model'

export interface Item {
  id: string
  category: Category
  action: string
  description: string
  targetDate: string | ''
  timingBasis: string
  status: Status
  lastUpdated: string
  dependencies: string
  windowEnd: string | ''
  source?: string
  notes?: string
}
