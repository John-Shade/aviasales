import { Spin } from 'antd'
import { LoadingOutlined, SyncOutlined } from '@ant-design/icons'

export function BigSpinner() {
  return <Spin className="spin" indicator={<LoadingOutlined style={{ fontSize: 160, marginTop: 50 }} />} />
}

export function HeaderSpinner() {
  return (
    <Spin
      className="logo"
      indicator={<SyncOutlined spin style={{ fontSize: 60, marginTop: 20, marginBottom: 13 }} />}
    />
  )
}
