from django.urls import path
from . import views

urlpatterns = [
  path('question-set/',views.QuestionSetListCreateView.as_view()),
  path('questions/',views.question_list_create),
  path('question-set/create/',views.questionset_create)
  ]