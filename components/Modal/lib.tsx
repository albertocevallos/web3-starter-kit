import styled from 'styled-components'
import { Dialog } from '@reach/dialog'

export const StyledDialog = styled(Dialog)`
  max-width: 22em;
  border-radius: 3px;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const ModalHeader = styled.div`
  padding-bottom: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const ModalTitle = styled.div`
  color: black;
  font-weight: 600;
  font-size: 1.1em;
  margin-top: 1em;
  margin-bottom: 0.25em;
`

export const ModalSubTitle = styled.div`
  color: #64758b;
  font-weight: 500;
  font-size: 1.1em;
`

export const ModalMenu = styled.div`
  margin: 1.5em 0;
  justify-content: flex-start;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const ModalMenuRow = styled.div`
  padding: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.05, 0.03, 0.35, 1);
  border-radius: 3px;

  &:hover {
    box-shadow: 0px 0px 24px rgb(0 0 0 / 8%);
  }
`

export const ModalMenuIcon = styled.img`
  height: 2.5em;
  width: 2.5em;
  margin-right: 1em;
`
export const ModalMenuArrow = styled.img`
  height: 2em;
  width: 2em;
`

export const ModalMenuGroup = styled.div`
  display: flex;
  align-items: center;
`
export const ModalDisclosure = styled.div`
  color: #64758b;
  font-weight: 500;
  font-size: 0.8em;
  & span {
    color: #ec4899;
  }
`
