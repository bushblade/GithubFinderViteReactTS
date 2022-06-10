import { createContext, Dispatch, ReactNode, useReducer } from 'react'
import githubReducer, { GithubAction } from './GithubReducer'
import { Repo } from './types/Repo'
import { User, UserItem } from './types/User'

// TODO: remove loading state

export interface ProviderValue {
  users: UserItem[]
  user: User | null
  repos: Repo[]
  dispatch: Dispatch<GithubAction>
}

class InitialState implements ProviderValue {
  users: UserItem[] = []
  user: User | null = null
  repos: Repo[] = []
  dispatch(action: GithubAction): void {
    throw new Error(`Default dispatch function used, of type: ${action.type}`)
  }
}

const initialState = new InitialState()

const GithubContext = createContext(initialState)

export const GithubProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(githubReducer, initialState)

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
