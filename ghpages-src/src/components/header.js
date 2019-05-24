import React from 'react'
import { Link } from 'gatsby'
import { Container, Button, Responsive } from 'semantic-ui-react'

const headerStyle = {
  background: '#93d12f',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: 60,
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 900
}

const Header = ({ siteTitle, onShowSidebar }) => (
  <div style={ headerStyle }>
    <Responsive maxWidth={768}>
      <Button icon="bars" style={{ margin: '1rem', background: '#e3eac5' }} onClick={ onShowSidebar } />
    </Responsive>
    <Container style={{ textAlign: 'center', flexGrow: 1 }}>
      <h1 style={{ padding: '1rem' }}>
        <Link style={{ color: 'white' }} to="/">
          {siteTitle}
        </Link>
      </h1>
    </Container>
  </div>
)

export default Header
