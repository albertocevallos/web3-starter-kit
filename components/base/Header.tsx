import React from 'react'
import styled from 'styled-components'
import Wrapper from 'components/Wrapper/index'
import Settings from './Settings'

const Row = styled.header`
  padding: 24px 1em;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
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
