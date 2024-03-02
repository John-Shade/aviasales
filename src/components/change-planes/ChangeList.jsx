import { Checkbox, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { filterTicketsAction } from '../../redux/filterReducer'
import './ChangeList.css'

const filterArr = {
  all: { Все: undefined },
  witoutChanges: { 'Без пересадок': 0 },
  oneChange: { '1 пересадка': 1 },
  twoChanges: { '2 пересадки': 2 },
  threeChanges: { '3 пересадки': 3 },
}

const arrValues = Object.keys(filterArr)
const arrLabels = Object.keys(Object.assign(...[...Object.values(filterArr)]))
const arrCounts = Object.values(Object.assign(...[...Object.values(filterArr)]))

const arrValueAndCount = Object.values(filterArr)

function ChangeList() {
  const mas = []
  const dispatch = useDispatch()
  const filterSelector = useSelector((state) => state.filterReducer)

  arrLabels.forEach((el, index) =>
    mas.push(
      <Row key={arrValues[index]} className="change-item">
        <Checkbox value={arrValues[index]}>
          <span className="change-item-text">{el}</span>
        </Checkbox>
      </Row>
    )
  )

  return (
    <div className="change-list--side">
      <span className="change-item-h">Количество пересадок</span>
      <Checkbox.Group
        onChange={(e) => {
          dispatch(filterTicketsAction(e))
        }}
        value={Object.keys(filterSelector).filter((el) => filterSelector[el] === true)}
      >
        <Col>{mas}</Col>
      </Checkbox.Group>
    </div>
  )
}

export { ChangeList, filterArr, arrValues, arrCounts, arrValueAndCount }
