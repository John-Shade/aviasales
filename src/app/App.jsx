import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import './App.css'
import ChangeList from '../components/change-planes'
import MainContent from '../components/main'
import { getTrips, getId } from '../api/Api'
import { HeaderSpinner } from '../components/spinner/Spinner'
import { lastLoadingAction } from '../redux/dataReducer'

import Logo from './Logo.svg'

function App() {
  const dispatch = useDispatch()
  const { id: selectorid } = useSelector((state) => state.userReducer)

  const { lastLoading: selectorLastLoading } = useSelector((state) => state.dataReducer)

  useEffect(() => {
    dispatch(getId)
  }, [])

  function getAllTrips() {
    dispatch(() => getTrips(selectorid, dispatch))
      .then((stop) => {
        if (stop === false) {
          return getAllTrips()
        }
        dispatch(lastLoadingAction(true))
        return null
      })
      .catch((err) => {
        console.log(err)
        return getAllTrips()
      })
  }

  useEffect(() => {
    if (selectorid) {
      getAllTrips()
    }
  }, [selectorid])

  return (
    <div className="App">
      <AppView selectorLastLoading={selectorLastLoading} />
    </div>
  )
}

function AppView({ selectorLastLoading }) {
  return (
    <>
      {selectorLastLoading ? <img src={Logo} alt="Лого" className="logo" /> : <HeaderSpinner />}
      <div className="AppView">
        <ChangeList />
        <MainContent />
      </div>
    </>
  )
}

export default App
