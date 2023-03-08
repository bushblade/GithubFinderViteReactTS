import axios from 'axios'
import { Repo } from './types/Repo'
import { User } from './types/User'
const GITHUB_URL: string = import.meta.env.VITE_APP_GITHUB_URL as string
const GITHUB_TOKEN: string = import.meta.env.VITE_APP_GITHUB_TOKEN as string

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
})

// Get search results
export const searchUsers = async (text: string): Promise<User[]> => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await github.get(`/search/users?${params}`)
  return response.data.items
}

// Get user and repos
export const getUserAndRepos = async (
  login: string
): Promise<{ user: User; repos: Repo[] }> => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ])

  return { user: user.data, repos: repos.data }
}
