import React  from 'react'
import { Route, Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const backButtonStyle = {
  background: '#93d12f',
  color: 'white',
  borderRadius: 0,
  border: 'none',
  height: '3em',
  width: '3em',
  display: 'flex',
  alignItems: 'center',
  margin: 0
}

const titleStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  background: '#e3eac5',
  color: '#4d4d4d',
  textAlign: 'center',
  height: '3em',
  paddingRight: '3em'
}

const Layout = ({component: Component, icon: Icon, title, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className='default-layout'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw' }}>  
          <Button icon='chevron left' as={ Link } to="/home" style={ backButtonStyle } />
          <div style={ titleStyle }>
            <div style={{ width: '2em', height: '2em', marginRight: '.5em' }}><Icon color='#4d4d4d' /></div>
            <span style={{ fontSize: '1.6em', fontWeight: 'bold' }}>{ title }</span>
          </div>
        </div>
        <Component {...matchProps} />
        <div style={{ height: '8em' }}></div>
      </div>
    )} />
  )
};
export default Layout