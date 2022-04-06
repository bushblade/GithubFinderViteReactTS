import { Alert } from './AlertContext'

interface SET_ALERT {
  type: 'SET_ALERT'
  payload: Alert
}

interface REMOVE_ALERT {
  type: 'REMOVE_ALERT'
}

type AlertAction = SET_ALERT | REMOVE_ALERT

const alertReducer = (
  state: Alert | null,
  action: AlertAction
): Alert | null => {
  switch (action.type) {
    case 'SET_ALERT':
      return action.payload
    case 'REMOVE_ALERT':
      return null
    default:
      return state
  }
}

export default alertReducer
