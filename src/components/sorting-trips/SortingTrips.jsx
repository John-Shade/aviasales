import './SortingTrips.css'

import { Flex, Radio } from 'antd'
import { useDispatch } from 'react-redux'

import { changeTypeAction } from '../../redux/sortingReducer'

function SortingTrips() {
  const arrLabels = ['САМЫЙ ДЕШЕВЫЙ', 'САМЫЙ БЫСТРЫЙ', 'ОПТИМАЛЬНЫЙ']
  const arrValues = ['cheap', 'fast', 'optimal']
  const dispatch = useDispatch()
  const mas = []

  arrLabels.forEach((el, index) => {
    mas.push(
      <Radio.Button value={arrValues[index]} key={arrValues[index]} className="sorting-item">
        <span className="sorting-item-text">{el}</span>
      </Radio.Button>
    )
  })
  return <SortingTripsView mas={mas} dispatch={dispatch} />
}

function SortingTripsView(props) {
  const { mas: radioButtonMas, dispatch } = props
  return (
    <Flex vertical gap="middle">
      <Radio.Group
        defaultValue="cheap"
        onChange={(e) => {
          dispatch(changeTypeAction(e.target.value))
        }}
      >
        {radioButtonMas}
      </Radio.Group>
    </Flex>
  )
}

export default SortingTrips
