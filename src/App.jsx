import { useQuery } from 'react-query';

function fetchUser(username){
  return fetch(`https://api.github.com/users/${username}`)
  .then(res => res.json())

}

function GithubUser({username}){
  //useQuery accepts 2 arguments. Query key which is an array that keeps track of query in the cache and query function that fetches the data
  const userQuery = useQuery(
    [username], 
    () => fetchUser(username)
     
  )

  //React query will fetch the data and make it available in userQuery.data property
  const data = userQuery.data;

  if(userQuery.isLoading) return <p>Loading...</p>

  if (userQuery.isError) return <p>Error: {userQuery.error.message}</p>

  return  (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}

function App() {
 

  return (
    <div className="App">
      <GithubUser username="uidotdev"/>
           
    </div>
  )
}

export default App
