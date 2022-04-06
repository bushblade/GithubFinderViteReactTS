import { ProviderValue } from './GithubContext'
import { Repo } from './types/Repo'
import { User, UserItem } from './types/User'

interface GET_USERS {
  type: 'GET_USERS'
  payload: UserItem[]
}

interface GET_USER_AND_REPOS {
  type: 'GET_USER_AND_REPOS'
  payload: {
    user: User
    repos: Repo[]
  }
}

interface SET_LOADING {
  type: 'SET_LOADING'
}

interface CLEAR_USERS {
  type: 'CLEAR_USERS'
}

export type GithubAction =
  | GET_USERS
  | GET_USER_AND_REPOS
  | SET_LOADING
  | CLEAR_USERS

const githubReducer = (
  state: ProviderValue,
  action: GithubAction
): ProviderValue => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    case 'GET_USER_AND_REPOS':
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'CLEAR_USERS':
      return {
        ...state,
        users: [],
      }
    default:
      return state
  }
}

export default githubReducer
