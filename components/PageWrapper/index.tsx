import styled from 'styled-components'

const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 1024px) {
    max-width: 1024px;
    margin: 0 auto;
  }
`
export default PageWrapper
