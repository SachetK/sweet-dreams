import { Recipe } from '@prisma/client'
import React, {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { RecipeWithRating } from '../utils/types'

const HistoryContext = createContext<{
  history: RecipeWithRating[]
  setHistory: Dispatch<SetStateAction<RecipeWithRating[]>>
}>({history: [], setHistory: (prev) => {return prev}})

export const useHistory = () => {
  return useContext(HistoryContext)
}

export const HistoryProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [history, setHistory] = useState<RecipeWithRating[]>([])

  return (
    <HistoryContext.Provider
      value={{ history: history, setHistory: setHistory }}
    >
      {children}
    </HistoryContext.Provider>
  )
}
