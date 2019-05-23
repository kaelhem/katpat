import React  from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import { PlayIcon, CalibrateIcon, StudioIcon } from './icons'

const iconStyle = {
  margin: '1em',
  width: '3em'
}

const menuStyle = {
  width: '100vw',
  maxWidth: 700,
  background: '#93d12f',
  borderRadius: 0
}

const menuItemStyle = {
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center',
  flexDirection: 'column'
}

const WhiteLabel = ({title}) => (
  <span style={{ color: 'white' }}>{ title }</span>
)

const HomeMenu = () => (
  <Menu style={ menuStyle } widths={3}>
    <Menu.Item as={Link} to="/play" style={ menuItemStyle }>
      <div style={ iconStyle }><PlayIcon /></div>
      <WhiteLabel title='PLAY' />
    </Menu.Item>

    <Menu.Item as={Link} to="/calibrate" style={ menuItemStyle }>
      <div style={ iconStyle }><CalibrateIcon /></div>
      <WhiteLabel title='CALIBRATE' />
    </Menu.Item>

    <Menu.Item as={Link} to="/studio" style={ menuItemStyle }>
      <div style={ iconStyle }><StudioIcon /></div>
      <WhiteLabel title='STUDIO' />
    </Menu.Item>      
  </Menu>
)

export default HomeMenu