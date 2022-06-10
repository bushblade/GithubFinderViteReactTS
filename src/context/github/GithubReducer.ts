import { ProviderValue } from './GithubContext'
import { Repo } from './types/Repo'
import { User, UserItem } from './types/User'

export enum GHActionTypes {
  GET_USERS = 'GET_USERS',
  GET_USER_AND_REPOS = 'GET_USER_AND_REPOS',
  SET_LOADING = 'SET_LOADING',
  CLEAR_USERS = 'CLEAR_USERS',
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

interface SET_LOADING {
  type: GHActionTypes.SET_LOADING
  payload?: any
}

interface CLEAR_USERS {
  type: GHActionTypes.CLEAR_USERS
  payload?: any
}

type Unhandled = {
  type: string
  payload?: any
}

export type GithubAction =
  | GET_USERS
  | GET_USER_AND_REPOS
  | SET_LOADING
  | CLEAR_USERS
  | Unhandled

const githubReducer = (
  state: ProviderValue,
  action: { type: GHActionTypes; payload?: any }
): ProviderValue => {
  switch (action.type) {
    case GHActionTypes.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    case GHActionTypes.GET_USER_AND_REPOS:
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      }
    case GHActionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GHActionTypes.CLEAR_USERS:
      return {
        ...state,
        users: [],
      }
    default:
      throw new Error(
        `No case for ${action.type} with payload: ${action.payload}`
      )
  }
}

export default githubReducer
