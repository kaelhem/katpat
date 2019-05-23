import React from 'react'
import { connect } from 'react-redux'
import KatpatConnector from 'components/katpat-connector'
import Menu from 'components/menu'

const messageStyle = {
  width: '100vw',
  maxWidth: 700,
  background: '#93d12f',
  height: '5em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '1.4em',
  textAlign: 'center',
  padding: '.5em'
}

const Home = ({ isConnected, errorMessage }) => (
  <div className='default-layout'>
    <div style={{ color: '#5b7224', height: '3em' }}>@kaelhem/ KatPat-Remote v{ process.env.REACT_APP_VERSION } / ©2019</div>
    <KatpatConnector />
    { isConnected ? (
      <Menu />
    ) : (
      <div style={ messageStyle }>
        { errorMessage ? (
          <span>{ errorMessage }</span>
        ) : (
          <span>Connect your <b>KatPat</b> bot to get started!</span>
        ) }
      </div>
    )}
  </div>
)

const mapStateToProps = ({ katpat }) => ({
  isConnected: katpat.device !== null,
  errorMessage: katpat.error
})

export default connect(mapStateToProps)(Home)