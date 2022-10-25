import { Recipe } from '@prisma/client'
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

const HistoryContext = createContext<{
  history: Recipe[]
  setHistory: Dispatch<SetStateAction<Recipe[]>> | undefined
}>({ history: [], setHistory: undefined })

export const useHistory = () => {
  return useContext(HistoryContext)
}

export const HistoryProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [history, setHistory] = useState<Recipe[]>([])

  return (
    <HistoryContext.Provider
      value={{ history: history, setHistory: setHistory }}
    >
      {children}
    </HistoryContext.Provider>
  )
}
