import styled from 'styled-components'
import constants from '../../constants'

const { colors, shadows, breakpoints, sizes } = constants.css

const Wrapper = styled.main`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background-color: ${colors.OCEAN_GREEN};
  @media only screen and (max-width: ${breakpoints.SM_SIZE}) {
  }
  @media only screen and (min-width: ${breakpoints.SM_SIZE}) {
    padding: 0 ${sizes.SIDE_MENU_SMALL_WIDTH};
  }
  @media only screen and (min-width: ${breakpoints.LG_SIZE}) {
    padding: 0 ${sizes.SIDE_MENU_BIG_WIDTH};
  }
`
const ContentSpace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-y: auto;
  background-color: ${colors.GHOST_WHITE};
  box-shadow: ${shadows.MATERIAL_3};
`

export { Wrapper, ContentSpace }
