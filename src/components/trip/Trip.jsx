import { add } from 'date-fns'

import './Trip.css'

function Trip({ ticket }) {
  return <TripView ticket={ticket} />
}

function TripView({ ticket }) {
  const tF = ticket.segments[0]
  const tS = ticket.segments[1]

  function changeTime(time) {
    return `${Math.floor(time / 60)}ч ${Math.floor(time % 60)}м `
  }

  function calcTime(time, duration) {
    let date
    if (duration) date = add(time, { minutes: duration })
    else date = new Date(time)
    const calcDate = `${date.getHours()}:${date.getMinutes().toString().length === 2 ? date.getMinutes() : `0${date.getMinutes()}`}`
    return calcDate
  }

  function changes(number) {
    switch (number) {
      case 0:
        return '0 пересадок'
      case 1:
        return '1 пересадка'
      default:
        return `${number} пересадки`
    }
  }

  return (
    <div className="trip">
      <div className="trip-line">
        <span className="price">{`${ticket.price} Р`}</span>
        <span>
          <img src={`https://pics.avs.io/99/36/${ticket.carrier}.png`} alt="Лого" />
        </span>
      </div>
      <div className="trip-line">
        <div className="trip-column">
          <span className="trip-column-first-line">
            {tF.origin} - {tF.destination}
          </span>
          <span className="trip-column-second-line">
            {calcTime(tF.date)} - {calcTime(tF.date, tF.duration)}
          </span>
        </div>
        <div className="trip-column trip-column--second-column">
          <span className="trip-column-first-line">В ПУТИ</span>
          <span className="trip-column-second-line">{changeTime(tF.duration)}</span>
        </div>
        <div className="trip-column trip-column--third-column">
          <span className="trip-column-first-line">{changes(tF.stops.length)}</span>
          <span className="trip-column-second-line">{tF.stops.join(', ')}</span>
        </div>
      </div>
      <div className="trip-line">
        <div className="trip-column">
          <span className="trip-column-first-line">
            {tS.origin} - {tS.destination}
          </span>
          <span className="trip-column-second-line">
            {calcTime(tS.date)} - {calcTime(tS.date, tS.duration)}
          </span>
        </div>
        <div className="trip-column trip-column--second-column">
          <span className="trip-column-first-line">В ПУТИ</span>
          <span className="trip-column-second-line">{changeTime(tS.duration)}</span>
        </div>
        <div className="trip-column trip-column--third-column ">
          <span className="trip-column-first-line">{changes(tS.stops.length)}</span>
          <span className="trip-column-second-line">{tS.stops.join(', ')}</span>
        </div>
      </div>
    </div>
  )
}

export default Trip
