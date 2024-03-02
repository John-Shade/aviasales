import { getDataAction, loadingAction } from '../redux/dataReducer'
import { getIdAction } from '../redux/userReducer'

async function getTrips(id, dispatch) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }
  const url = `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`
  const rep = await fetch(url, options)
  const data = await rep.json()

  dispatch(getDataAction(data.tickets))
  dispatch(loadingAction(false))
  return data.stop
}

async function getId(dispatch) {
  const url = 'https://aviasales-test-api.kata.academy/search'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }
  const rep = await fetch(url, options)
  const data = await rep.json()

  dispatch(getIdAction(data.searchId))
}

export { getTrips, getId }
