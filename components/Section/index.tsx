import styled from 'styled-components'

interface SectionProps {
  readonly height: string
  readonly background: string
}

const Section = styled.div<SectionProps>`
  height: ${(props) => props.height}em;
  background: ${(props) => props.background};
  display: flex;
  flex-direction: column;
  padding: 0 1em;
`

export default Section
