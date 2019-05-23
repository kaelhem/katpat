import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as katpatActions, bleStatus } from 'redux/reducers/katpat'
import { Image, Label, Button, Loader } from 'semantic-ui-react'
import logo from 'assets/logo.svg'
import dots from 'assets/dots.svg'
import bluetoothIcon from 'assets/bluetooth-icon.svg'

const loaderStyle = {
  width: '8em',
  height: '8em',
  borderRadius: '2em',
  background: '#e3eac5',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const buttonStyle = {
  background: '#93d12f',
  width: '8em',
  height: '8em',
  borderRadius: '2em',
  color: 'white'
}

const KatpatConnector = (props) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
    <Image src={ logo } style={{ width: '10em' }} />
    <Image src={ dots } style={{ width: '.5em', marginTop: '-1em', marginBottom: '1em' }} />
    { props.isConnected && (
      <Fragment>
        <Label>CONNECTED</Label>
        <Button onClick={ props.disconnectKatpat }>DISCONNECT</Button>
      </Fragment>
    )}
    { props.isConnecting && (
      <div style={ loaderStyle }>
        <Loader size='large' active inline />
      </div>
    )}
    { !props.isConnected && !props.isConnecting && (
      <Button onClick={ props.connectKatpat } style={ buttonStyle }>
        <Image size='mini' src={bluetoothIcon} style={{ margin: '1em auto' }} />
        <div>CONNECT</div>
      </Button>
    )}
  </div>
)

const mapStateToProps = ({ katpat }) => ({
  isConnecting: !katpat.device && katpat.status !== bleStatus.DISCONNECTED,
  isConnected: katpat.device !== null,
  status: katpat.status
})

const mapDispatchToProps = (dispatch) => ({
  connectKatpat: bindActionCreators(katpatActions.connect, dispatch),
  disconnectKatpat: bindActionCreators(katpatActions.disconnect, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(KatpatConnector)