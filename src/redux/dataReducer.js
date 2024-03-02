const initialState = {
  data: [],
  index: 4,
  isLoading: true,
  lastLoading: false,
}

const GET_DATA = 'GET_DATA'
const SET_INDEX = 'SET_INDEX'
const FIRST_LOADING = 'FIRST_LOADING'
const LAST_LOADING = 'LAST_LOADING'

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return { ...state, data: [...state.data, ...action.payload] }
    case SET_INDEX:
      return { ...state, index: action.payload }
    case FIRST_LOADING:
      return { ...state, isLoading: action.payload }
    case LAST_LOADING:
      console.log(`LAST_LOADING -- билетов ${state.data.length}`)
      return { ...state, lastLoading: action.payload }
    default:
      return state
  }
}

export const getDataAction = (payload) => ({ type: GET_DATA, payload })
export const setIndexAction = (payload) => ({ type: SET_INDEX, payload })
export const loadingAction = (payload) => ({ type: FIRST_LOADING, payload })
export const lastLoadingAction = (payload) => ({ type: LAST_LOADING, payload })
