import useFetch from '../hooks/fetch'


function UserForms () {
  
  const url = 'api/question/question-set/'
  
  const { isLoading, data, error } = useFetch(url)
  
  if (isLoading){
    return <h1>loading...</h1>
  }else{
    console.log(data)
  }
  
  return <h1>this is where all your forms lie</h1>
  
}

export default UserForms