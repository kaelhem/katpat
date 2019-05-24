import React, { Fragment, createRef, useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Sidebar, Container, Grid, Segment, Responsive } from 'semantic-ui-react'
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
      >
        <div style={ sidebarStyle }>
          <MainMenu />
        </div>
      </Sidebar>
      <Sidebar.Pusher>
        <div style={{ marginTop: '10rem' }}>
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
            <Container>
              <Grid relaxed stackable>
                <Grid.Column mobile={16} tablet={4} computer={4}>
                  <Responsive minWidth={768} as={MainMenu} />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                  { children }
                </Grid.Column>
              </Grid>
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
