import api from '../api.jsx'

export const getFormResponse = async({formId,responseId}) => {
  
  const form = await api.get(`api/question/question-set/${formId}`)
  const formData = form.data

  const response = await api.get(`api/response/${responseId}`)
  const responseData = response.data
  
  return { formData, responseData }
}
