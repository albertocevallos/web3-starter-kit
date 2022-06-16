import React from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: JSX.Element
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ height: '100%', minHeight: '100vh' }}>
      <div style={{ flex: '1 1 auto' }}>
        <Header />
        <>{children}</>
        <Footer />
      </div>
    </div>
  )
}
