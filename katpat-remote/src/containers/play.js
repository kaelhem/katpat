import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as katpatActions } from 'redux/reducers/katpat'
import { Menu, Button } from 'semantic-ui-react'

const Play = (props) => {

  const [currentLeg, setCurrentLeg] = useState(-1)

  const moveCoxal = (angle) => {
    props.send('MOVE' + currentLeg + '0' + angle)
  }

  const load = () => {
    props.send('LOAD')
  }

  return (
    <div>
      <div>
        <Button onClick={ load }>LOAD</Button>
        <Menu secondary compact color="green" inverted>
          <Menu.Item
            name='Front Left'
            active={currentLeg === 0}
            onClick={ () => setCurrentLeg(0) }
          />
          <Menu.Item
            name='Front Right'
            active={currentLeg === 1}
            onClick={ () => setCurrentLeg(1) }
          />
          <Menu.Item
            name='Back Right'
            active={currentLeg === 2}
            onClick={ () => setCurrentLeg(2) }
          />
          <Menu.Item
            name='Back Left'
            active={currentLeg === 3}
            onClick={ () => setCurrentLeg(3) }
          />
        </Menu>
      </div>
      { currentLeg !== -1 && (
        <div>
          <Button onClick={ () => moveCoxal(0) }>move coxal to 0°</Button>
          <Button onClick={ () => moveCoxal(45) }>move coxal to 45°</Button>
          <Button onClick={ () => moveCoxal(90) }>move coxal to 90°</Button>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = ({ katpat }) => ({})

const mapDispatchToProps = (dispatch) => ({
  send: bindActionCreators(katpatActions.send, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Play)