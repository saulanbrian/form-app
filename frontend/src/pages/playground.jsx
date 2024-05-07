import api from '../api'
import { useEffect, useState } from 'react'

function Playground(){
  
  const [questions,setQuestions] = useState([])
  const [loading,setLoading] = useState(true)
  
  useEffect(() => {
    
    const getData = async() => {
      const res = await api.get('api/question/question-set/')
      
      if(res.status === 200){
        setQuestions([...res.data])
        setLoading(false)
      }
      
    }
    
    getData();
  },[])
  
  if (loading) return <h1>loadingg</h1>
  
  return <>
  <h1>finished</h1>
  </>
  
}

export default Playground;