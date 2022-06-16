import React from 'react'
import { Dialog } from '@reach/dialog'
import { animated, useSpring, useTransition } from 'react-spring'

interface ModalProps {
  isOpen: boolean
  close: () => void
}

export default function Modal({ isOpen, close }: ModalProps) {
  return (
    <>
      <Dialog isOpen={isOpen} onDismiss={close}>
        <p>Some Content</p>
      </Dialog>
    </>
  )
}
