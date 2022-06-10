import { ProviderValue } from './GithubContext'
import { Repo } from './types/Repo'
import { User, UserItem } from './types/User'

export enum GHActionTypes {
  GET_USERS = 'GET_USERS',
  GET_USER_AND_REPOS = 'GET_USER_AND_REPOS',
  CLEAR_USERS = 'CLEAR_USERS',
  CLEAR_USER = 'CLEAR_USER',
  SEARCH_USERS = 'SEARCH_USERS',
}

interface GET_USERS {
  type: GHActionTypes.GET_USERS
  payload: UserItem[]
}

interface GET_USER_AND_REPOS {
  type: GHActionTypes.GET_USER_AND_REPOS
  payload: {
    user: User
    repos: Repo[]
  }
}

interface CLEAR_USERS {
  type: GHActionTypes.CLEAR_USERS
  payload?: any
}

interface CLEAR_USER {
  type: GHActionTypes.CLEAR_USER
  payload?: any
}

interface SEARCH_USERS {
  type: GHActionTypes.SEARCH_USERS
  payload?: any
}

type Unhandled = {
  type: string
  payload?: any
}

export type GithubAction =
  | GET_USERS
  | GET_USER_AND_REPOS
  | CLEAR_USERS
  | CLEAR_USER
  | SEARCH_USERS
  | Unhandled

const githubReducer = (
  state: ProviderValue,
  action: { type: GHActionTypes; payload?: any }
): ProviderValue => {
  switch (action.type) {
    case GHActionTypes.SEARCH_USERS:
      return {
        ...state,
        users: [],
        searching: true,
      }
    case GHActionTypes.GET_USERS:
      return {
        ...state,
        users: action.payload,
        searching: false,
      }
    case GHActionTypes.GET_USER_AND_REPOS:
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
      }
    case GHActionTypes.CLEAR_USERS:
      return {
        ...state,
        users: [],
      }
    case GHActionTypes.CLEAR_USER:
      return {
        ...state,
        user: null,
      }
    default:
      throw new Error(
        `No case for ${action.type} with payload: ${action.payload}`
      )
  }
}

export default githubReducer
