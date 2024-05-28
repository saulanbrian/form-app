import { useState,useEffect } from 'react'
import { useCreateResponse } from '../queries/response.jsx'

function AnswerForm({formData,responseData}){
  
  const newResponseMutation = useCreateResponse()
  
  const form = formData
  const [answers,setAnswers] = useState({})
  const [finalAnswers,setFinalAnswers] = useState([])
  
  let correctAnswers = 0
  
  function getCorrectAnswers(){
    let guessed = 0
    if (responseData) {
      const guess = responseData.answers 
      guess.forEach(guess => {
        const correct = form.questions.map(question => {
          const answer = question.choices.find(choice => choice.id == guess)
          if (answer && answer.is_correct) guessed += 1
        })
      })
    }
    correctAnswers = guessed
  }
  
  if (responseData) getCorrectAnswers()
  
  useEffect(() => {
    var picks = []
    Object.keys(answers).forEach(key => {
      picks.push(answers[key])
    })
    setFinalAnswers([...picks])
  },[answers])
  
  function handleChange(questionId,choiceId){
    setAnswers(prev => ({...prev,[questionId]:choiceId}))
  }

  
  function isPicked(choiceId){
    const guess = choiceId
    for (const [questionId,choiceId] of Object.entries(answers)){
      if(choiceId === guess) return true
    }
    return false
  }
  
  function onResponse(choiceId){
    if (responseData){
      return responseData.answers.some(answer => answer === choiceId)
    }
  }
  
  function checkAnswer(choiceId){
    if (!onResponse(choiceId)) return ''
    
    var border = 'border-danger'
    
    form.questions.forEach(question => {
      for (const choice of question.choices){
        if (choice.id == choiceId && choice.is_correct) border = 'border-success'
      }
      })
      
    return border
  }
  
  function handleSubmit(e){
    e.target.disabled = true
    newResponseMutation.mutate({
      question_set:form.id,
      answers:[...finalAnswers]
    })
  }
  
  return <div className='container-fluid bg-primary-subtle'>
    <div className='container bg-light mt-2 p-2' >
      <h1>{form.title}</h1>
      <div className='col-12 d-flex justify-content-end'>
        {correctAnswers} / {form.questions.length }
      </div>
    </div>
    
    
      { form.questions.map(question => {
        const questionId = question.id
        return <div className='container bg-light m-1 p-2'key={question.id}>
          <h1>{question.question_text}</h1>
          <hr />
          {question.choices.map(choice => {
            return <div key={choice.id} className={`border p-1 mb-1 d-flex align-items-center ${responseData && checkAnswer(choice.id)}`}>
              <input type='radio' 
                     className='col-1' 
                     onChange={e => handleChange(questionId,choice.id) }
                     checked={responseData? onResponse(choice.id) : isPicked(choice.id)}
                     disabled={responseData? true: false}/>
              <p className='col-11'>{ choice.choice_text }</p>
            </div>
          })}
        </div>
      }) }
  
    {!responseData && <button className='btn btn-primary'
            onClick={handleSubmit}>submit</button>}
  </div>
}

export default AnswerForm;