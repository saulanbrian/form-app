from django.urls import path
from . import views

urlpatterns = [
  path('question-set/',views.QuestionSetListCreateView.as_view())
  ]