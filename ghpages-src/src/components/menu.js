import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'gatsby'

const LinkedItem = ({ children, ...props }) => (
  <Menu.Item as={Link} activeClassName='active' {...props}>{children}</Menu.Item>
)

const MainMenu = ({ children, data }) => (
  <Menu text vertical fluid>
    <LinkedItem to='/page-2'>Introduction</LinkedItem>
    <Menu.Item>
      How it works
      <Menu text vertical>
        <LinkedItem to='/page-2'>Second Page</LinkedItem>
        <LinkedItem to='/404'>404 Example Page</LinkedItem>    
      </Menu>
    </Menu.Item>
    <Menu.Item>
      <LinkedItem to='/page-2'>Make it</LinkedItem>
      <Menu text vertical>
        <LinkedItem to='/page-2'>Second Page</LinkedItem>
        <LinkedItem to='/404'>404 Example Page</LinkedItem>    
      </Menu>
    </Menu.Item>
    <Menu.Item>
      Use it
      <Menu text vertical>
        <LinkedItem to='/page-2'>Second Page</LinkedItem>
        <LinkedItem to='/404'>404 Example Page</LinkedItem>    
      </Menu>
    </Menu.Item>
  </Menu>
)
        
export default MainMenu
