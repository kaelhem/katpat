import React from 'react'
import { connect } from 'react-redux'
import Layout from './layout.js'
import KatpatConnector from './katpat-connector'

const BleProtectedRoute = (props) => {
  const { component, icon, path, title, isConnected } = props
  if (!isConnected) {
    return (
      <Layout exact path={ path } title={ title } component={ KatpatConnector } icon={ icon } />
    )
  }
  return (
    <Layout exact path={ path } title={ title } component={ component } icon={ icon } />
  )
}

const mapStateToProps = ({ katpat }) => ({
  isConnected: katpat.device !== null
})

export default connect(mapStateToProps)(BleProtectedRoute)