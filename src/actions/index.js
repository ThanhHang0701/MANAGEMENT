
export const actionTypes = {
    LOGOUT: 'LOGOUT',
    SET_USER: 'SET_USER',
    SAVE_PROFILE: 'SAVE_PROFILE',
}


export const authLogin = (user) => {
    return {
        type: actionTypes.SET_USER,
        user: user
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT,
        user: ''
    }
}

export const saveProfile = (user) => {
        return {
            type: actionTypes.SAVE_PROFILE,
            user: user
        }
  }

