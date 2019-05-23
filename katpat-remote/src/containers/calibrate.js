import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as katpatActions } from 'redux/reducers/katpat'
import { Button, Menu, Image } from 'semantic-ui-react'
import { LegIcon, CoxalIcon, FemurIcon, TibiaIcon } from 'components/icons'
import coxalPulseScheme from 'assets/coxal-pulse-scheme.svg'
import femurPulseScheme from 'assets/femur-pulse-scheme.svg'
import tibiaPulseScheme from 'assets/tibia-pulse-scheme.svg'

const PULSE_OFFSET_LENGTH = '10'

const Calibrate = (props) => {

  const [currentLeg, setCurrentLeg] = useState(-1)
  const [currentBone, setCurrentBone] = useState(-1)
  const [kindPulse, setKindPulse] = useState(-1)
  const [canSave, setCanSave] = useState(false)

  const changeLegFor = (leg) => {
    changeBoneFor(-1)
    setCurrentLeg(leg)
  }

  const changeBoneFor = (bone) => {
    setKindPulse(-1)
    setCurrentBone(bone)
  }

  const prepareCalibrationFor = (selectedKindPulse) => {
    const command = selectedKindPulse === 0 ? 'GOMIN' : 'GOMAX'
    props.send(command + currentLeg + currentBone)
    setKindPulse(selectedKindPulse)
  }

  const decreasePulse = () => {
    props.send('CALI' + currentLeg + currentBone + kindPulse + '0' + PULSE_OFFSET_LENGTH)
    setCanSave(true)
  }

  const increasePulse = () => {
    props.send('CALI' + currentLeg + currentBone + kindPulse + '1' + PULSE_OFFSET_LENGTH)
    setCanSave(true)
  }

  const saveCalibration = () => {
    props.send('SAVE')
    setCanSave(false)
  }

  const getScheme = () => {
    switch (currentBone) {
      case 0: return coxalPulseScheme
      case 1: return femurPulseScheme
      case 2: return tibiaPulseScheme
      default: return null
    }
  }

  const buttonStyle = {
    background: '#93d12f',
    borderRadius: '.2em',
    color: 'white',
    fontSize: '2.5em',
    padding: '.5em',
    margin: '.5em 1em',
    width: '2em'
  }

  const saveButtonStyle = {
    background: '#93d12f',
    borderRadius: '1em 1em 0 0',
    color: 'white',
    padding: '1.5em 3em'
  }

  const LegMenuItem = ({ name, index }) => {
    return (
      <Menu.Item
        style={{ 
          background: currentLeg === index ? '#4D4D4D' : '#93d12f',
          color: 'white',
          borderRadius: 0,
          padding: '.5em 0',
          marginTop: '1em',
          minWidth: '5.2em',
          border: '1px solid white',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap'
        }}
        active={currentLeg === index}
        onClick={ () => changeLegFor(index) }
      >
        <span style={{ fontSize: '.8em' }}>{ name }</span>
        <div style={{ margin: '.5em 0', width: '2.5em' }}>
          <LegIcon selected={currentLeg === index} rotation={ 90 * index } />
        </div>
      </Menu.Item>
    )
  }

  const BoneMenuItem = ({ name, index, icon: BoneIcon }) => {
    return (
      <Menu.Item
        style={{ 
          background: currentBone === index ? '#4D4D4D' : '#93d12f',
          color: 'white',
          borderRadius: 0,
          padding: '.3em',
          marginTop: '.8em',
          marginRight: '.2em',
          minWidth: '5.2em',
          border: '1px solid white',
          textTransform: 'uppercase'
        }}
        active={currentBone === index}
        onClick={ () => changeBoneFor(index) }
      >
        <div style={{ margin: '.5em .3em', width: '3em' }}>
          <BoneIcon selected={currentBone === index} />
        </div>
        <span style={{ fontSize: '.9em', textAlign: 'center' }}>{ name }</span>
      </Menu.Item>
    )
  }

  const PulseMenuItem = ({ name, index }) => (
    <Menu.Item
      style={{ 
          background: kindPulse === index ? '#4D4D4D' : '#93d12f',
          color: 'white',
          borderRadius: 0,
          padding: '1em',
          marginTop: '.8em',
          marginRight: '.2em',
          minWidth: '5.2em',
          border: '1px solid white',
          textTransform: 'uppercase'
        }}
      name={ name }
      onClick={ () => prepareCalibrationFor(index) }
    />
  )

  return (
    <div>
      <div>
        <Menu secondary icon='labeled' widths={4} style={{ width: '98vw', maxWidth: 700 }}>
          <LegMenuItem name='Front Left' index={0} />
          <LegMenuItem name='Front Right' index={1} />
          <LegMenuItem name='Back Right' index={2} />
          <LegMenuItem name='Back Left' index={3} />
        </Menu>
      </div>
      { currentLeg !== -1 && (
        <div>
          <Menu secondary widths={3}>
            <BoneMenuItem name='Coxal' index={0} icon={ CoxalIcon } />
            <BoneMenuItem name='Femur' index={1} icon={ FemurIcon } />
            <BoneMenuItem name='Tibia' index={2} icon={ TibiaIcon } />
          </Menu>
        </div>  
      )}
      { currentBone !== -1 && (
        <div>
          <Menu secondary color="grey" widths={2}>
            <PulseMenuItem name='Min pulse' index={0} />
            <PulseMenuItem name='Max pulse' index={1} />
          </Menu>
          <Image src={ getScheme() } fluid style={{ width: '90%', maxWidth: 500, margin: 'auto' }} />
        </div>
      )}
      { kindPulse !== -1 && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', margin: '.5em' }}>
          <Button style={ buttonStyle } onClick={ decreasePulse }>-</Button>
          <Button style={ buttonStyle } onClick={ increasePulse }>+</Button>
        </div>
      )}
      <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100vw', textAlign: 'center' }}>
        <Button style={{ ...saveButtonStyle, opacity: canSave ? 1 : .5 }} onClick={ saveCalibration }>SAVE</Button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ katpat }) => ({})

const mapDispatchToProps = (dispatch) => ({
  send: bindActionCreators(katpatActions.send, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Calibrate)