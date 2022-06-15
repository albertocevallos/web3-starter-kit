import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

interface LayoutProps {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ height: '100%', minHeight: '100vh' }}>
      <Wrapper style={{ flex: '1 1 auto' }}>
        <>{children}</>
      </Wrapper>
    </div>
  )
}
