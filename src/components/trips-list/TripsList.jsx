import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import { useMemo, useState, useEffect, useRef } from 'react'
import _ from 'lodash'

import './TripsList.css'
import { arrCounts, arrValues } from '../change-planes/ChangeList'
import Trip from '../trip'

import WarningMessage from './WarningMessage'

function TripsList() {
  const disapatch = useDispatch()

  const [sortOptimalState, setSortOptimalState] = useState([])

  const [isActualCheapState, setIsActualCheapState] = useState(false)
  const [isActualFastState, setIsActualFastState] = useState(false)
  const [isActualOptimalState, setIsActualOptimalState] = useState(false)

  const CheapRef = useRef([])
  const FastRef = useRef([])

  const {
    data: dataSelector,
    index: selectorIndex,
    isLoading: selectorLoading,
  } = useSelector((state) => state.dataReducer)

  const filterSelector = useSelector((state) => state.filterReducer)

  function filterItems() {
    const trueItemsFilter = Object.keys(filterSelector).filter((el) => filterSelector[el] === true)
    const countsOftrueItemsFilter = arrCounts.filter((el, index) => trueItemsFilter.includes(arrValues[index]))
    if (!trueItemsFilter.includes('all')) {
      const filterData = dataSelector.filter(
        (el) =>
          countsOftrueItemsFilter.includes(el.segments[0].stops.length) &&
          countsOftrueItemsFilter.includes(el.segments[1].stops.length)
      )
      return filterData
    }
    return dataSelector
  }

  const { type } = useSelector((state) => state.sortingReducer)

  const data = useMemo(filterItems, [filterSelector, dataSelector])
  // Мемоизация отфильтрованных данных

  useEffect(() => {
    setIsActualCheapState(false)
    setIsActualFastState(false)
    setIsActualOptimalState(false)
    // Изменение данных - потеря актуальности мемоизации сортировки
  }, [data])

  const useCustomMemo = (dep, typeOfSort, setActualState) => {
    useEffect(() => {
      if ((type === typeOfSort && dep === false) || (type === 'optimal' && dep === false)) {
        // Мемоизация именно той сортировки, которая выбрана в данный момент.
        // Переход по вкладкам не провоцирует повторную сортировку.
        setActualState(true)
        if (typeOfSort === 'cheap') CheapRef.current = data.slice().sort((a, b) => a.price - b.price)
        if (typeOfSort === 'fast')
          FastRef.current = data
            .slice()
            .sort(
              (a, b) =>
                a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
            )
      }
    }, [data, type, dep])
    if (typeOfSort === 'cheap') return CheapRef.current
    return FastRef.current
  }

  const dataCheap = useCustomMemo(isActualCheapState, 'cheap', setIsActualCheapState)
  const dataFast = useCustomMemo(isActualFastState, 'fast', setIsActualFastState)

  const useCustomMemoForOptional = () => {
    useEffect(() => {
      if (type === 'optimal' && isActualOptimalState === false) {
        setIsActualOptimalState(true)
        const sortDataCheap = CheapRef.current.slice(0, 700)
        const sortDataFast = FastRef.current.slice(0, 700)
        // Переход на оптимальную сортировку переиспользует другие сортрровки, если они актуальны.
        const arrResults = []
        sortDataFast.forEach((el, index) => {
          const indexInCheap = sortDataCheap.findIndex((item) => {
            if (_.isEqual(el, item)) {
              // Поиск соответствующих билетов среди отсортированных массивов
              return true
            }
            return false
          })
          if (indexInCheap !== -1) arrResults.push([(indexInCheap + index) / 2, el])
          // Индесы билетов складываются и делятся на 2
        })
        arrResults.sort((a, b) => a[0] - b[0])
        // Лучший билет - билет с меньшим средним индесом
        const sortDataOptimal = arrResults.map((el) => el[1])
        setSortOptimalState(sortDataOptimal)
      }
    }, [data, type, isActualOptimalState])
    return sortOptimalState
  }

  const dataOptimal = useCustomMemoForOptional()

  function sortItems() {
    switch (type) {
      case 'cheap': {
        return dataCheap
      }
      case 'fast': {
        return dataFast
      }
      case 'optimal': {
        return dataOptimal
      }
      default:
        return data
    }
  }

  const dataSort = sortItems()

  const arrTripsList = []

  function createKey(item) {
    const tF = item.segments[0]
    const tS = item.segments[1]
    return (
      item.carrier +
      item.price +
      tF.destination +
      tS.origin +
      tF.duration +
      tS.duration +
      tF.stops.length +
      tS.stops.length
      // Создание собственного ключа
    )
  }

  for (let i = 0; i <= selectorIndex; i += 1) {
    if (dataSort.length > 0) {
      arrTripsList.push(<Trip ticket={dataSort[i]} key={createKey(dataSort[i])} />)
    }
  }
  return (
    <div>
      {dataSort.length === 0 && <WarningMessage />}
      {selectorLoading === false && arrTripsList}
      {selectorLoading === false && dataSort.length > 0 && (
        <Button className="loadingButton" onClick={() => disapatch({ type: 'SET_INDEX', payload: selectorIndex + 5 })}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ
        </Button>
      )}
    </div>
  )
}

export default TripsList
