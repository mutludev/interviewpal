export type Interview = {
  _id: string
  company: string
  title: string
  status: 'wishlist' | 'applied' | 'rejected' | 'accepted'
  url: string
  description: string
  notes: string
}
