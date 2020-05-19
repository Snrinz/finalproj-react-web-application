import * as ACTION_TYPES from './action_types'

export const login_success = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS
  }
}

export const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE
  }
}


export const add_profile = (profile) => {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile
  }
}

export const remove_profile = () => {
  return {
    type: ACTION_TYPES.REMOVE_PROFILE
  }
}

// reset profile to newState ***
export const reset_profile = (newState) => {  
  return {
    type: ACTION_TYPES.RESET_PROFILE,
    state: newState
  }
}

