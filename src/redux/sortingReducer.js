// const initialState = {
//   cheap: true,
//   fast: false,
//   optimal: false,
// }

// const CHEAP = 'CHEAP'
// const FAST = 'FAST'
// const OPTIMAL = 'OPTIMAL'

// export const sortingReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CHEAP:
//       return { ...state, cheap: true, fast: false, optimal: false }
//     case FAST:
//       return { ...state, fast: true }
//     case OPTIMAL:
//       return { ...state, optimal: true }
//     default:
//       return state
//   }
// }

// const CHEAP = 'CHEAP'
// const FAST = 'FAST'
// const OPTIMAL = 'OPTIMAL'

const CHANGE_TYPE = 'CHANGE_TYPE'

const initialState = {
  type: 'cheap',
}

export const sortingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TYPE:
      console.log('CHANGE_TYPE')
      console.log(action.payload)
      return { ...state, type: action.payload }
    default:
      return state
  }
}

// export const setCheapAction = (payload) => ({ type: CHEAP, payload })
// export const setFastAction = (payload) => ({ type: FAST, payload })
// export const setOptimalAction = (payload) => ({ type: OPTIMAL, payload })

export const changeTypeAction = (payload) => ({ type: CHANGE_TYPE, payload })
