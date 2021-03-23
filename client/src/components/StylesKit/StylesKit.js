import styled from 'styled-components'

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

const StylesKit = {
  CleanedButton,
}

export default StylesKit
