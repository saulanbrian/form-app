import { useCreateForm } from '../queries/forms'

import { useFormCreationContext } from '../context/form-creation-context'

import { useState, useEffect} from 'react'

import './formcreation.css'

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
  
  function handleChoiceChange(e,choiceIndex,questionIndex){
    const text = e.target.value
    var currentQuestions = questions
    currentQuestions[questionIndex].choices[choiceIndex].choice_text = text
    setQuestions([...currentQuestions])
  }
  
  function addQuestion(){
    setQuestions(prev => ([...prev,{
      question_text:'',
      choices:[
        {choice_text:'',is_correct:false},
        {choice_text:'',is_correct:false},
        ]
    }]))
  }
  
  
  
  return <>
  <div className='container-fluid bg-primary-subtle main'>
  <div className='container form-group border p-2  m-1 gap-0 bg-light' >
    <label className='form-label '>Form Title</label>
    <textarea 
      placeholder='enter the title for this form...'
      className='form-control text-primary' 
      name='title' 
      onChange={setTitle}></textarea>
  </div>
    {questions.map((question,index) => {
      const questionIndex = index
      return <div key={questionIndex} className='form-group container border p-2 m-1 bg-light'>
              <label className='form-label'>Question:</label>
              <textarea
                className='form-control text-primary'
                onChange={(e) => handleChange(e,index)} 
                value={question.question_text}
                placeholder='enter a question...'
                ></textarea>
                <hr />
                <label className='form-label'>choices</label>
                { question.choices.map((choice,index) => {
                  const choiceIndex = index
                  return <>
                  <textarea key={choiceIndex}
                    className='form-control mt-1 text-primary' 
                    onChange={(e) => handleChoiceChange(e,choiceIndex,questionIndex)} 
                    value={choice.choice_text}
                    placeholder='enter choice text here...'>
                  </textarea>
                </>
                })}
            </div>
      })}
    <button className='btn btn-secondary m-1' onClick={addQuestion}>
      add question
    </button>
    </div>
  </>
}

export default FormCreation;