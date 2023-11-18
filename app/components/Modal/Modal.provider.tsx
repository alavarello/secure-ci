import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

interface ModalContextProps {
  isVisible: boolean
  openModal: () => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextProps>({
  isVisible: false,
  openModal: () => {},
  closeModal: () => {},
})

export const useModalContext = () => useContext(ModalContext)

interface ModalContextProvider {
  children: ReactNode
}

const ModalContextProvider: React.FC<ModalContextProvider> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)

  const openModal = useCallback(() => {
    setIsVisible(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsVisible(false)
  }, [])
  return <ModalContext.Provider value={{ isVisible, openModal, closeModal }}>{children}</ModalContext.Provider>
}

export default ModalContextProvider
