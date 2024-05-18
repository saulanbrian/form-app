from django.urls import path
from . import views

urlpatterns = [
  path('question-set/',views.QuestionSetListCreateView.as_view()),
  path('question/update/<pk>',views.QuestionUpdateView.as_view())
  ]