import React, { FC } from 'react'
import './index.scss'

const ErrorPage: FC = () => {
  return (
    <div className="error-page">
      <div className="result-container">
        <img width="480" src="http://staging-cnbj2-fds.api.xiaomi.net/fs-server/workbench/media/route-error.png" alt="network-broken" />
        <div className="result-text">抱歉，页面崩溃了，请联系开发</div>
      </div>
    </div>
  )
}

export default ErrorPage
