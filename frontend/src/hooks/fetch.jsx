import api from '../api'
import { useAuth } from '../context/usercontext'
import { useState,useEffect } from 'react'

const useFetch = (url) => {
  
  const [isLoading,setIsLoading] = useState(true)
  const [data,setData] = useState(null)
  const [error,setError] = useState(null)
  
  const { setIsAuthenticated } = useAuth();
  
  
  useEffect(() => {
    
    const getData = async() => {
      try{
        const res = await api.get(url)
        
        if (res.status === 200){
          setData(res.data)
        }
        
      }catch(e){
        if (e.response && e.response.status === 401){
          console.log(e)
          setIsAuthenticated(false)
        }
        setError(e)
      }finally{
        setIsLoading(false)
      }
    }
    
    getData();
    
  },[url])
  
  return { isLoading, data, error }
  
}

export default useFetch;