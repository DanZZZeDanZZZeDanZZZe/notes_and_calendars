import { fadeIn } from 'react-animations'
import styled, { keyframes } from 'styled-components'
import { Form as FormFromFormik } from 'formik'
import constants from '../../../constants'

const { colors, shadows, breakpoints } = constants.css

const Form = styled(FormFromFormik)`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  padding-top: 5rem;

  @media only screen and (max-width: ${breakpoints.SM_SIZE}) {
    width: 90%;
  }
  @media only screen and (min-width: ${breakpoints.SM_SIZE}) {
    width: 75%;
  }
  @media only screen and (min-width: ${breakpoints.LG_SIZE}) {
    width: 60%;
  }
`

const Legend = styled.legend`
  font-size: 1.2rem;
  font-stretch: ultra-expanded;
  font-weight: 500;
`

const Label = styled.label``

const TextInput = styled.input`
  background-color: white;
  padding: 1rem;
  font-size: 1.1rem;
  border: none;
  box-sizing: border-box;
  box-shadow: ${shadows.MATERIAL_1};
`

const Error = styled.span`
  text-align: right;
  color: ${colors.MAROON_X11};
  animation: ${keyframes(fadeIn)} 0.3s ease-in-out;
`

const Button = styled.button`
  padding: 1rem;
  margin-top: 2.5rem;
  font-size: 1.1rem;
  border: none;
  box-sizing: border-box;
  box-shadow: ${shadows.MATERIAL_1};
  color: ${colors.GHOST_WHITE};
  background-color: ${colors.OCEAN_GREEN};
  margin-left: auto;
  transition: ease-out 0.3s;
  &:hover {
    cursor: pointer;
    background-color: ${colors.EGGPLANT};
  }
  &:disabled {
    opacity: 0.6;
    &:hover {
      cursor: auto;
      background-color: ${colors.OCEAN_GREEN};
    }
  }
`

const FieldWrapper = styled.div`
  display: grid;
  width: 100%;
  padding-top: 2rem;
  grid-gap: 1rem;
`

export { Form, Legend, Label, TextInput, Error, Button, FieldWrapper }
