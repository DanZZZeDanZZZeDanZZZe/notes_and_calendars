import React from 'react'
import SideMenu from '../SideMenu'
import { Nav } from './styled-components'

function NavSideMenu({ children }) {
  return (
    <SideMenu>
      <Nav>
        <ul>
          {React.Children.map(children, (link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      </Nav>
    </SideMenu>
  )
}

export default NavSideMenu
