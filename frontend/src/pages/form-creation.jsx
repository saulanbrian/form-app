import { useCreateForm } from '../queries/forms'

import { useFormCreationContext } from '../context/form-creation-context'

import { useState, useEffect} from 'react'

function FormCreation(){
  const {
    setForm,
    form,
    questions,
    setQuestions,
  } = useFormCreationContext()
  
  
  function setTitle(e) {
    const title = e.target.value
    setForm(prev => ({
      ...prev,
      title:title
    }))
  }
  
  function handleChange(e,index){
    const text = e.target.value
    const currentQuestions = questions
    currentQuestions[index].question_text = text
    setQuestions([...currentQuestions])
  }
  
  function addQuestion(){
    setQuestions(prev => ([...prev,{
      question_text:'',
      choices:[]
    }]))
  }
  
  console.log(questions)
  
  return <>
  <div className='container form-group border p-2 m-1 ' >
    <input 
      placeholder='title'
      className='form-control' 
      name='title' 
      onChange={setTitle}/>
      <hr />
      <label className='form-label' >questions</label>
      {questions.map((question,index) => {
        console.log(question.question_text)
        return <div key={index}>
                <input
                  className='form-control mt-2'
                  onChange={(e) => handleChange(e,index)} 
                  value={question.question_text}
                  />
               </div>
      })}
    <button className='btn btn-primary' onClick={addQuestion}>
        add question
    </button>
  </div>
  </>
}

export default FormCreation;