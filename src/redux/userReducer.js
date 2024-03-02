const initialState = {
  id: 0,
}

const GET_ID = 'GET_ID'

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ID:
      return { ...state, id: action.payload }
    default:
      return state
  }
}

export const getIdAction = (payload) => ({ type: GET_ID, payload })
