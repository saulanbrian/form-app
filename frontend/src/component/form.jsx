import { useCreateForm } from '../queries/forms'

import { useFormContext } from '../context/formcontext.jsx'

import { useState, useEffect} from 'react'

import api from '../api.jsx'

import './form.css'


const defaultForm = {
    title:'',
    questions:[{
      question_text:'',
      choices:[
        {choice_text:'',is_correct:false},
        {choice_text:'',is_correct:false},
        ]
    }]
  }


const defaultActionFunction = async({form}) => {
  console.log(form)
  try{
    const res = await api.post('api/question/question-set/',form)
    const data = res.data
  }catch(e){
    console.log(e.response.status)
    const data = null
  }finally{
    return data
  }
}




function Form({
  formData=defaultForm,
  userAction='create',
  actionFunction=defaultActionFunction
  }){
  
  const [form,setForm] = useState(formData)
  const [questions,setQuestions] = useState(formData.questions)
  
  const editable = userAction != 'view'
  
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
  
  async function handleSubmit(){
    const data = await actionFunction({form});
  }
  
  function setAnswer({e,index,questionIndex}){
    console.log('pass for now')
  }
  
  function Choice({choice,index,questionIndex}){
    return <>
    <textarea 
      className='form-control text-primary'
      placeholder='enter a choice...'
      value={choice.choice_text}
      onChange={(e) => {handleChoiceChange(e,index,questionIndex)}}
      readOnly={editable? false: true}>
    </textarea>
    <div className='form-check'>
      <input type='checkbox' 
             className='form-check-input'
             id={index}
             checked={choice.is_correct}
             onChange={(e) => {setAnswer(e,index,questionIndex)}/>
      <label className='form-label' for={index}>
        set as correct
      </label>
    </div>
    </>
  }
  
  function Question(index){
    const questionIndex = index
    const question = questions[index]
    return <div className='fom-group container boder p-2 m-1 bg-light'>
      <label className='form-label'>Question</label>
      <textarea className='form-control text-primary'
                placeholder='enter a question...'
                value ={ question.question_text }
                onChange={e => {handleChange(e,index)}}
                readOnly={editable? false: true}
      ></textarea>
      <hr />
      <label className='form-label'>choices</label>
      {question.choices.map((choice,index) => {
        return Choice({choice,index,questionIndex})
      })}
    </div>
  }
  
  return <>
  <div className='container-fluid bg-primary-subtle main'>
  
    <div className='container form-group border p-2  m-1 gap-0 bg-light' >
      <label className='form-label '>Form Title</label>
      <textarea 
        placeholder='enter the title for this form...'
        className='form-control text-primary' 
        name='title' 
        onChange={setTitle}
        vlue={form.title}
        readOnly={editable? false: true}></textarea>
    </div>
    {questions.map((question,index) => {
      return Question(index)
    })}
  </div>
  </>
}


export default Form;