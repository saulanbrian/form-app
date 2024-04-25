from django.urls import path
from . import views

urlpatterns = [
  path('',views.QuestionSetListCreateView.as_view())
  ]