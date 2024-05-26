import { useState } from 'react'

function AnswerForm({formData}){
  
  const form = formData
  const [answers,setAnswers] = useState([])
  
  function handleChange(choiceId){
    setAnswers(prev => [...prev,choiceId])
    console.log(answers)
  }
  
  return <div className='container-fluid bg-primary-subtle'>
    <div className='container bg-light mt-2 p-2' >
      <h1>{form.title}</h1>
    </div>
    
    <div className='container bg-light m-1 p-2'>
      { form.questions.map(question => {
        return <div key={question.id}>
          <h1>{question.question_text}</h1>
          <hr />
          {question.choices.map(choice => {
            return <div key={choice.id} className='border p-1 mb-1 d-flex align-items-center'>
              <input type='radio' className='col-1' onChange={e => handleChange(choice.id) }/>
              <p className='col-11'>{ choice.choice_text }</p>
            </div>
          })}
        </div>
      }) }
    </div>
  </div>
}

export default AnswerForm;