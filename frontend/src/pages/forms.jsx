import useFetch from '../hooks/fetch'
import QuestionnairePreview from '../component/questionnaire-preview'
import './forms.css'
import Loader from '../component/loader.jsx'

function UserForms () {
  
  const url = 'api/question/question-set/'
  
  const { isLoading, data, error } = useFetch(url)
  
  if (isLoading) return <Loader />
  
  data && console.log(data)
  
  return <div className='container-fluid'>
    { data && data.length > 0
    ?data.map((questionnaire) => {
      return <QuestionnairePreview 
        key={questionnaire.id}
        title={questionnaire.title}
        />
      })
    :<h1>you have no questionnaires yet</h1>
    }
    <button className='btn btn-primary'>
      create questionnare
    </button>
  </div>
}

export default UserForms