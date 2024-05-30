import { useCreateForm } from '../queries/forms'

import { useState, useEffect} from 'react'

import { useNavigate } from 'react-router-dom'

import api from '../api.jsx'

import './form.css'


function Form({
  formData,
  editable=true,
  actionFunction,
  errors=null
  }){
  
  const navigate = useNavigate()
  const [form,setForm] = useState(formData)
  const [questions,setQuestions] = useState(formData.questions)
  
  
  useEffect(() => {
    setForm({
      ...form,
      questions:[...questions]
    })
  },[questions])
  
  
  function setTitle(e) {
    const title = e.target.value
    setForm(prev => ({
      ...prev,
      title:title
    }))
  }
  
  function setDescription(e){
    const description = e.target.value
    setForm(prev => ({
      ...prev,
      description:description
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
        {choice_text:'',is_correct:true},
        {choice_text:'',is_correct:false},
        ]
    }]))
  }
  
  function setAnswer({e,index,questionIndex}){
    const checked = e.target.checked
    const currentQuestions = questions
    currentQuestions[questionIndex].choices.forEach((choice) => { choice.is_correct=false})
    currentQuestions[questionIndex].choices[index].is_correct = true
    setQuestions([...currentQuestions])
  }
  
  function Choice({choice,index,questionIndex}){
    return <>
    <textarea 
      className='form-control text-primary border border-dark-subtle'
      placeholder='enter choice...'
      value={choice.choice_text}
      onChange={(e) => {handleChoiceChange(e,index,questionIndex)}}
      readOnly={editable? false: true}>
    </textarea>
    <div className='form-check'>
      <input type='checkbox' 
             className='form-check-input'
             id={index}
             checked={choice.is_correct}
             onChange={(e) => {setAnswer({e,index,questionIndex})}} 
             disabled={editable? false: true }
             />
      <label className='form-label' htmlFor={index}>
       <em style={{fontSize:'10px'}}>set as correct</em>
      </label>
    </div>
    </>
  }
  
  function Question(index){
    const questionIndex = index
    const question = questions[index]
    return  <div className='form-group container boder p-2 bg-light form-main' key={question.id}>
      <label className='form-label text-primary'>
        Question</label>
      <textarea className='form-control text-primary border border-dark-subtle'
                placeholder='enter question...'
                value ={ question.question_text }
                onChange={e => {handleChange(e,index)}}
                readOnly={editable? false: true}
      ></textarea>
      <hr />
      <label className='form-label text-primary'>choices</label>
      {question.choices.map((choice,index) => {
        return Choice({choice,index,questionIndex})
      })}
    </div>
  }
  
  return <>
  <div className='bg-primary-subtle main'>
  
    <div className='container form-group border p-2 gap-1 col-md-7 bg-light' >
      <label className='form-label text-primary'>Form Title</label>
      <textarea 
        placeholder='enter title...'
        
        className='form-control text-primary mt-1 bg-light-subtle border border-dark-subtle' 
        name='title' 
        onChange={setTitle}
        value={form.title}
        readOnly={editable? false: true}></textarea>
      <label className='form-label text-primary'>Description</label>
      <textarea 
        placeholder='enter description...'
        className='form-control text-primary border border-dark-subtle' 
        name='description' 
        onChange={setDescription}
        value={form.description}
        readOnly={editable? false: true}></textarea>
    </div>
    {questions.map((question,index) => {
      return Question(index)
    })}
  
    { editable && <>
    <button className='btn btn-secondary' onClick={addQuestion}>
      add question
    </button>

    <button 
      className='btn btn-primary' 
      onClick={() => actionFunction({form})}
      >submit</button>
      </>
    }
  </div>
  </>
}


export default Form;