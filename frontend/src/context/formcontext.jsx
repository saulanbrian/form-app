import { useContext,createContext,useEffect,useState } from 'react'
import { useGetForms } from '../queries/forms.jsx'

const FormCreationContext = createContext()

export const useFormContext = () => {
  return useContext(FormCreationContext)
}


function FormContextProvider({children}){
  
  const [forms,setForms] = useState([])
  const formsData = useGetForms()
  
  useEffect(() => {
    console.log('refetching data')
    if (formsData.data) {
      setForms([...formsData.data])
    }
  }, [formsData.data])
   
  return <FormCreationContext.Provider value={{
    forms
  }}>
  { children }
  </FormCreationContext.Provider>
  
}

export default FormContextProvider;