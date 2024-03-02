import { useSelector } from 'react-redux'

import { BigSpinner } from '../spinner/Spinner'
import TripsList from '../trips-list'
import SortingTrips from '../sorting-trips'
import './Main.css'

function MainContent() {
  const { isLoading: selectorLoading } = useSelector((state) => state.dataReducer)

  const content = selectorLoading ? <BigSpinner /> : <TripsList />

  return (
    <div className="main-content">
      <SortingTrips />
      {content}
    </div>
  )
}

export default MainContent
