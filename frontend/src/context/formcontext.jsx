import { useContext,createContext,useEffect,useState } from 'react'

const FormCreationContext = createContext()

export const useFormContext = () => {
  return useContext(FormCreationContext)
}


function FormContextProvider({children}){
  
  const [action,setAction] = useState('create')
  const [form,setForm] = useState({title:''})
  const [questions,setQuestions] = useState([{
    question_text:'',
    choices:[
      {choice_text:'',is_correct:false},
      {choice_text:'',is_correct:false},
      ]
  }])
   
  return <FormCreationContext.Provider value={{
    form,setForm,questions,setQuestions,action,setAction
  }}>
  { children }
  </FormCreationContext.Provider>
  
}

export default FormContextProvider;