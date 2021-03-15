import React from 'react'
import {
  Wrapper,
  OpeningButton,
  CloseIcon,
  OpeningIcon,
  CloseButton,
  DisappearingWrapper,
  DisappearingOpeningButton,
  Content,
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
          <CloseButton onClick={() => this.closeButtonClickHandler()}>
            <CloseIcon />
          </CloseButton>
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
            <CloseButton disabled>
              <CloseIcon />
            </CloseButton>
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

export default SideMenu
