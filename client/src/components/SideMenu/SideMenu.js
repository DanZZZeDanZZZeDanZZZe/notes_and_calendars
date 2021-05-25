import React from 'react'
import { connect } from 'react-redux'
import { clearData as logout } from '../../redux/authenticationSlice'
import {
  Wrapper,
  OpeningButton,
  CloseIcon,
  LogoutIcon,
  OpeningIcon,
  DisappearingWrapper,
  DisappearingOpeningButton,
  Content,
  ButtonsPanel,
  Button,
} from './styled-components.js'

class SideMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: false,
      touched: false,
    }
  }

  closeButtonClickHandler() {
    this.setState({
      activity: false,
    })
  }

  openButtonClickHandler() {
    this.setState({
      activity: true,
      touched: true,
    })
  }

  render() {
    const contentForMenu = (
      <>
        <h1>Menu</h1>
        <Content>{this.props.children}</Content>
      </>
    )

    const activeMenu = (
      <>
        <Wrapper>
          <ButtonsPanel>
            <Button onClick={() => this.closeButtonClickHandler()}>
              <CloseIcon />
            </Button>
            <Button onClick={() => this.props.logout()}>
              <LogoutIcon />
            </Button>
          </ButtonsPanel>

          {contentForMenu}
        </Wrapper>
        <DisappearingOpeningButton disabled>
          <OpeningIcon />
        </DisappearingOpeningButton>
      </>
    )

    const inactiveMenu = (
      <>
        {this.state.touched && (
          <DisappearingWrapper>
            <ButtonsPanel>
              <Button disabled>
                <CloseIcon />
              </Button>
              <Button disabled>
                <LogoutIcon />
              </Button>
            </ButtonsPanel>
            {contentForMenu}
          </DisappearingWrapper>
        )}
        <OpeningButton onClick={() => this.openButtonClickHandler()}>
          <OpeningIcon />
        </OpeningButton>
      </>
    )

    return this.state.activity ? activeMenu : inactiveMenu
  }
}

export default connect(null, { logout })(SideMenu)
