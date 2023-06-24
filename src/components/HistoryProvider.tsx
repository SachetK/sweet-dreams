import React, { createContext, useCallback, useContext, useState } from "react";
import type { RecipeWithRating } from "~/utils/types";

const HistoryContext = createContext<{
  history: RecipeWithRating[];
  pushRecipe: (recipe: RecipeWithRating) => void;
  popRecipe: () => void;
  peekRecipe: () => RecipeWithRating | undefined;
  isEmpty: () => boolean;
}>({
  history: [],
  pushRecipe: () => void 0,
  popRecipe: () => void 0,
  peekRecipe: () => undefined,
  isEmpty: () => true,
});

export const useHistory = () => {
  return useContext(HistoryContext);
};

export const HistoryProvider: React.FC<{ children: React.JSX.Element }> = ({
  children,
}) => {
  const [history, setHistory] = useState<RecipeWithRating[]>([]);

  const pushRecipe = useCallback((recipe: RecipeWithRating) => {
    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.push(recipe);
      return newHistory;
    });
  }, []);

  const popRecipe = useCallback(() => {
    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
    });
  }, []);

  const peekRecipe = () => {
    return history[history.length - 1];
  };

  const isEmpty = () => {
    return history.length === 0;
  };

  return (
    <HistoryContext.Provider
      value={{ history, pushRecipe, popRecipe, peekRecipe, isEmpty }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
