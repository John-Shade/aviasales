const initialState = {
  all: true,
  witoutChanges: true,
  oneChange: true,
  twoChanges: true,
  threeChanges: true,
}

const ALL = 'ALL'
const WITHOUT = 'WITHOUT'
const ONE_CHANGE = 'ONE_CHANGE'
const TWO_CHANGES = 'TWO_CHANGES'
const THREE_CHANGES = 'THREE_CHANGES'

const CHANGE = 'CHANGE'

export const filterReducer = (state = initialState, action) => {
  const arr = { ...state }
  switch (action.type) {
    case ALL:
      return { ...state, all: true }
    case WITHOUT:
      return { ...state, witoutChange: true }
    case ONE_CHANGE:
      return { ...state, oneChange: true }
    case TWO_CHANGES:
      return { ...state, twoChange: true }
    case THREE_CHANGES:
      return { ...state, threeChange: true }

    case CHANGE:
      if (action.payload.at(-1) !== 'all') {
        Object.keys(arr).forEach((el) => {
          if (action.payload.includes(el)) {
            arr[el] = true
          } else arr[el] = false
        })
        if (Object.values({ ...arr, all: true }).includes(false)) {
          arr.all = false
        }
        if (Object.values({ ...arr, all: true }).every((el) => el === true)) {
          if (Object.values(state).every((el) => el === true)) {
            Object.keys(arr).forEach((el) => {
              arr[el] = false
            })
          } else arr.all = true
        }
      } else {
        Object.keys(arr).forEach((el) => {
          arr[el] = true
        })
      }
      return arr
    default:
      return state
  }
}

export const getAllTickets = (payload) => ({ type: ALL, payload })
export const getTicketsWithoutChanges = (payload) => ({ type: WITHOUT, payload })
export const getTicketsOneChange = (payload) => ({ type: ONE_CHANGE, payload })
export const getTicketsTwoChanges = (payload) => ({ type: TWO_CHANGES, payload })
export const getTicketsThreeChanges = (payload) => ({ type: THREE_CHANGES, payload })

export const filterTicketsAction = (payload) => ({ type: CHANGE, payload })
