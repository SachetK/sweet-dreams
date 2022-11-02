import { NextPage } from 'next'
import { useHistory } from '../components/HistoryProvider'
import RecipeComponent from '../components/RecipeComponent'

const History: NextPage = () => {
  const { history } = useHistory()
  return (
    <main className="h-screen bg-main">
      <h1 className="text-bold text-center text-6xl">History</h1>
      <div className="mx-[32%] my-4 w-max">
        {history?.map((recipe) => (
          <RecipeComponent key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  )
}

export default History
