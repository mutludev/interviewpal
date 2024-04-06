const endpoints: { [key: string]: string } = {
  login: 'api/user/login',
  register: 'api/user',
  getUser: 'api/user',
  logout: 'api/user/logout',
  user: 'api/user',
  getInterviews: 'api/job',
  addInterview: 'api/job',
  updateInterview: 'api/job/:id',
  deleteInterview: 'api/job/:id'
}

export default function getEndpoint(name: string, params: { [key: string]: string } = {}): string {
  const endpoint = endpoints[name]
  if (!endpoint) {
    throw new Error(`Endpoint ${name} not found`)
  }
  return Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, params[key]), endpoint)
}
