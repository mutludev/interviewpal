export type Todo = {
  value: string
  check: boolean
  deadline: string
}

export type Interview = {
  _id: string
  company: string
  title: string
  status: 'wishlist' | 'applied' | 'rejected' | 'accepted'
  url: string
  description: string
  notes: string
  deadline: string
  todos: Todo[]
}
