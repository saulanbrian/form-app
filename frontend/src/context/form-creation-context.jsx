import { useContext,createContext,useEffect,useState } from 'react'

const FormCreationContext = createContext()

export const useFormCreationContext = () => {
  return useContext(FormCreationContext)
}


function FormCreationContextProvider({children}){
  
  const [form,setForm] = useState({title:''})
  const [questions,setQuestions] = useState([{
    question_text:'',
    choices:[
      {choice_text:'',is_correct:false},
      {choice_text:'',is_correct:false},
      ]
  }])
   
  return <FormCreationContext.Provider value={{
    form,setForm,questions,setQuestions
  }}>
  { children }
  </FormCreationContext.Provider>
  
}

export default FormCreationContextProvider;