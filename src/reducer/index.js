import { actionTypes } from '../actions/index'
const initialState = {
    user: {
        RepositoryID: localStorage.getItem('RepositoryID'),
        ID: localStorage.getItem('ID'),
        Role: localStorage.getItem('Role')
    },
    access_token: localStorage.getItem('Token')
};

export default function counterApp (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {user: action.user, access_token: localStorage.getItem('Token')}
        case actionTypes.LOGOUT:
            state = {}
            return state
        case actionTypes.SAVE_PROFILE:
            return { ...state}
        default:
            return state
    }
}
