import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Sidebar, Container, Segment, Responsive } from 'semantic-ui-react'
import MainMenu from './menu'
import Header from './header'
import 'semantic-ui-less/semantic.less'

const Box = ({ children }) => (
  <div>{ children }</div>
)

const sidebarStyle = {
  background: '#e3eac5',
  display: 'flex',
  justifyContent: 'center',
  top: 0,
  position: 'absolute',
  width: '100%',
  bottom: 0,
  padding: '3rem'
}

const LayoutWrapper = ({ children, showSidebar, onHideSidebar }) => {
  const handleSidebarHide = () => {
    console.log('on sidebar hidden')
    onHideSidebar()
  }

  return (
    <Sidebar.Pushable as={ Box }>
      <Sidebar
        as={ Segment }
        animation='overlay'
        icon='labeled'
        onHide={ handleSidebarHide }
        vertical
        visible={ showSidebar }
        width='wide'
        style={{ zIndex: 1000 }}
      >
        <div style={ sidebarStyle }>
          <MainMenu />
        </div>
      </Sidebar>
      <Sidebar.Pusher>
        <div style={{ paddingTop: 60, height: '100vh' }}>
          { children }
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

const Layout = ({ children, data }) => {
  const [sidebarVisibility, setSidebarVisibility] = useState(false)

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <Fragment>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'A quadruped arduino robot driven over bluetooth' },
              { name: 'keywords', content: 'robot, katpat, arduino, quadruped, bluetooth' }
            ]}
          />
          <LayoutWrapper showSidebar={ sidebarVisibility } onHideSidebar={ () => setSidebarVisibility(false) }>
            <Header siteTitle={data.site.siteMetadata.title} onShowSidebar={ () => setSidebarVisibility(true) } />
            <Container style={{ height: '100%' }}>
              <div style={{ display: 'flex', height: '100%' }}>
                <Responsive minWidth={768} style={{ background: '#e3eac5' }}>
                  <div style={{ padding: '2em', margin: 0}}>
                    <MainMenu />
                  </div>
                </Responsive>
                <Responsive style={{ padding: '2em' }}>
                  { children }
                </Responsive>
              </div>
            </Container>
          </LayoutWrapper>
        </Fragment>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
