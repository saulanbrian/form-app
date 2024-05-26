from django.urls import path
from . import views

urlpatterns = [
  path('question-set/',views.QuestionSetListCreateView.as_view()),
  path('question-set/update/<pk>',views.QuestionSetUpdateView.as_view()),
  path('question/update/<pk>',views.QuestionUpdateView.as_view()),
  path('question-set-update',views.update_questionset),
  path('question-set/<pk>',views.QuestionSetRetrieveView.as_view())
  ]