import { useContext, useEffect } from 'react'
import UserResults from '../components/users/UserResults'
import UserSearch from '../components/users/UserSearch'
import GithubContext from '../context/github/GithubContext'
import { GHActionTypes } from '../context/github/GithubReducer'

function Home() {
  const { dispatch } = useContext(GithubContext)
  // reset user state
  useEffect(() => {
    dispatch({ type: GHActionTypes.CLEAR_USER })
  }, [dispatch])
  return (
    <>
      <UserSearch />
      <UserResults />
    </>
  )
}

export default Home
