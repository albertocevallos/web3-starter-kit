import React from 'react'
import styled from 'styled-components'
import Wrapper from '../Wrapper'
import { socialsArray } from 'config/menu'

const StyledWrapper = styled(Wrapper)`
  width: 100%;
  @media only screen and (min-width: 1024px) {
    max-width: 576px;
  }
`

const Wallpaper = styled.header`
  border-color: rgba(241, 245, 249, 1);
`
const Grid = styled.div`
  width: 100%;
  padding: 2em;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1.5rem;
  justify-items: center;
`

const Item = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: #94a3b8;
`

export const Footer = () => {
  return (
    <Wallpaper>
      <StyledWrapper>
        <Grid>
          {socialsArray.map((item) => {
            return (
              <Item href={item.link} target="_blank" key={item.name}>
                {item.name}
              </Item>
            )
          })}
        </Grid>
      </StyledWrapper>
    </Wallpaper>
  )
}
