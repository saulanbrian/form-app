from django.urls import path

from . import views

urlpatterns = [
  path('',views.ResponseListCreateView.as_view()),
  path('<pk>',views.ResponseRetrieveView.as_view())
  ]