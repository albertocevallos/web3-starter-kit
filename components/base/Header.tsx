import React from 'react'
import styled from 'styled-components'

import Wrapper from '../Wrapper'
import Settings from './Settings'

const Row = styled.header`
  display: flex;
  flex-flow: row wrap;
`

const Title = styled.div`
  flex-basis: 25%;
  max-width: 25%;
`

const Menu = styled.div`
  flex-basis: 50%;
  max-width: 50%;
  text-align: center;
`

export const Header = () => {
  return (
    <Wrapper>
      <Row>
        <Title>Title</Title>
        <Menu>Menu</Menu>
        <Settings />
      </Row>
    </Wrapper>
  )
}
