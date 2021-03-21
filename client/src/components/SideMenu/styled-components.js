import styled, { keyframes } from 'styled-components'
import { fadeInLeft, fadeIn } from 'react-animations'
import { IoIosArrowDropright, IoIosCloseCircleOutline } from 'react-icons/io'
import constants from '../../constants'

const { colors, shadows, breakpoints, sizes } = constants.css

const buttonWidth = '2.5rem'
const wrapperPadding = '1rem'

const Wrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: ${wrapperPadding};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  animation: ${keyframes(fadeInLeft)} 0.3s ease-in-out;
  color: ${colors.GHOST_WHITE};
  background-color: ${colors.MAROON_X11};
  box-shadow: inset ${shadows.MATERIAL_2};

  & > h1 {
    font-size: 1.2rem;
    word-wrap: break-word;
  }
  @media only screen and (max-width: ${breakpoints.SM_SIZE}) {
    width: ${sizes.SIDE_MENU_BIG_WIDTH};
    &::after {
      content: '';
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: ${sizes.SIDE_MENU_BIG_WIDTH};
      background-color: rgba(0, 0, 0, 0.8);
      animation: ${keyframes(fadeIn)} 0.7s ease-in-out;
    }
  }
  @media only screen and (min-width: ${breakpoints.SM_SIZE}) {
    width: ${sizes.SIDE_MENU_SMALL_WIDTH};
  }
  @media only screen and (min-width: ${breakpoints.LG_SIZE}) {
    width: ${sizes.SIDE_MENU_BIG_WIDTH};
  }
`

const DisappearingWrapper = styled(Wrapper)`
  animation-direction: reverse;
  animation-fill-mode: forwards;
`

const CleanedButton = styled.button`
  padding: 0;
  border: none;
  font-style: inherit;
  color: inherit;
  background-color: transparent;
  & {
    cursor: pointer;
  }
`

const Button = styled(CleanedButton)`
  width: ${buttonWidth};
  height: 2.5rem;
`

const CloseButton = styled(Button)`
  align-self: start;
`

const OpeningButton = styled(Button)`
  position: fixed;
  top: 1rem;
  bottom: 0;
  left: ${wrapperPadding};
  animation: ${keyframes(fadeIn)} 0.3s ease-in-out;
`

const DisappearingOpeningButton = styled(OpeningButton)`
  animation-direction: reverse;
  animation-fill-mode: forwards;
`

const CloseIcon = styled(IoIosCloseCircleOutline)`
  width: 2rem;
  height: 2rem;
`

const OpeningIcon = styled(IoIosArrowDropright)`
  width: 2rem;
  height: 2rem;
`

const Content = styled.div`
  flex-grow: 1;
  width: 100%;
`

export {
  Wrapper,
  DisappearingWrapper,
  Button,
  CloseIcon,
  OpeningIcon,
  CloseButton,
  OpeningButton,
  DisappearingOpeningButton,
  Content,
}
