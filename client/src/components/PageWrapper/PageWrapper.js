import React from 'react'

import { ContentSpace, Wrapper } from './styled-components'

function PageWrapper(props) {
  return (
    <Wrapper>
      <ContentSpace>{props.children}</ContentSpace>
    </Wrapper>
  )
}

export default PageWrapper
