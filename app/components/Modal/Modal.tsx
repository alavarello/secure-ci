import { FC, ReactNode, useEffect } from 'react'
import styles from './Modal.module.css'
import { useModalContext } from './Modal.provider'

export interface ModalProps {
  children: string | ReactNode
  onClose?: () => void
  isOpenedByDefault?: boolean
  innerContainer?: string
  outerContainer?: string
}

export const Modal: FC<ModalProps> = ({
  children,
  onClose,
  isOpenedByDefault = false,
}) => {
  const { isVisible, closeModal, openModal } = useModalContext()

  useEffect(() => {
    isOpenedByDefault && openModal()
  }, [isOpenedByDefault, openModal])

  if (!isVisible) {
    return null
  }

  return (
      <div
        className={styles.outerContainer}
        onClick={() => {
          closeModal()
          onClose?.()
        }}
      >
        <div onClick={(e) => e.stopPropagation()} className={styles.innerContainer}>
          {children}
        </div>
      </div>
  )
}

export default Modal
