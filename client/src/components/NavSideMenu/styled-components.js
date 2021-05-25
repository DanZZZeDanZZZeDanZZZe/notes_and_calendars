import constants from '../../constants'
import styled from 'styled-components'

const { LG_SIZE: lgSize } = constants.css.breakpoints
const { GHOST_WHITE: ghostWhite } = constants.css.colors

const Nav = styled.div`
  & ul {
    margin: 1rem 0;
    padding: 0;
  }
  & li {
    list-style-type: none;
    border-radius: 0.5rem;
    &:hover {
      cursor: pointer;
      opacity: 0.9;
    }
  }
  & a {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    text-decoration: none;
    color: inherit;
  }
  @media only screen and (max-width: ${lgSize}) {
    & li {
      margin-top: 1rem;
      font-size: 1.2rem;
      background-color: ${ghostWhite};
      color: black;
    }
    & a {
      padding: 1rem 0;
    }
  }
  @media only screen and (min-width: ${lgSize}) {
    & li {
      margin-top: 1rem;
      transition: all 0.1s;
      &:hover {
        background-color: ${ghostWhite};
        color: black;
      }
    }
    & a {
      padding: 0.5rem 0;
    }
  }
`
export { Nav }
