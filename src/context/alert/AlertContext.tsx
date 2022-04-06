import { createContext, ReactNode, useReducer } from 'react'
import alertReducer from './AlertReducer'

export interface Alert {
  msg: string
  type: string
}

interface SetAlert {
  (msg: string, type: string): void
}

interface ProviderValue {
  alert: Alert | null
  setAlert: SetAlert
}

const initialState: ProviderValue = {
  alert: null,
  setAlert: () => {
    throw new Error('Default setAlert function used')
  },
}

const AlertContext = createContext(initialState)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const initialState = null

  const [state, dispatch] = useReducer(alertReducer, initialState)

  // Set an alert
  const setAlert: SetAlert = (msg, type) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    })

    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000)
  }

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext
