import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Image } from 'semantic-ui-react'

const TopNavigation = () => (
  <Menu  pointing inverted>
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

export default TopNavigation
