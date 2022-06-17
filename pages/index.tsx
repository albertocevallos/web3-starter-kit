import React from 'react'
import styled from 'styled-components'
import Section from 'components/Section'
import Wrapper from 'components/Wrapper'
import Title from 'components/Title'
import SubTitle from 'components/SubTitle'
import { Card, Head } from 'components/Card'
import { useTokenDataStore } from 'store/tokendata'

const HeroWrapper = styled(Wrapper)`
  padding-top: 6rem;
  @media only screen and (min-width: 1024px) {
    max-width: 576px;
  }
`
const CardWrapper = styled(Wrapper)`
  width: 100%;

  @media only screen and (min-width: 1024px) {
    max-width: 576px;
  }
`
const StyledCard = styled(Card)`
  margin-top: -8em;
`

const index = () => {
  const useTokenInfos = useTokenDataStore((state) => state.tokenInfos)
  console.log(useTokenInfos)

  return (
    <>
      <Section height="28" background="white">
        <HeroWrapper>
          <Title>Web3 Starter Kit</Title>
          <SubTitle>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </SubTitle>
        </HeroWrapper>
      </Section>
      <Section height="40" background="linear-gradient(to top, rgb(0, 0, 0), rgb(15, 23, 42))">
        <CardWrapper>
          <StyledCard>
            <Head>Lorem ipsum dolor sit amet,</Head>
          </StyledCard>
        </CardWrapper>
      </Section>
    </>
  )
}

export default index
