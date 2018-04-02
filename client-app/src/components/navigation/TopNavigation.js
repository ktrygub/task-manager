import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Image } from 'semantic-ui-react'
// import PropTypes from 'prop-types'
// import getGravatar from 'get-gravatar'

const TopNavigation = () => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard/1">
      Dashboard
    </Menu.Item>

    <Menu.Menu position="right">
      <Dropdown trigger={<Image avatar />}>
        <Dropdown.Menu>
          <Dropdown.Item>Login/Logout will be here</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
)
TopNavigation.propTypes = {
  // user: PropTypes.shape({ email: PropTypes.string })
}

export default TopNavigation
