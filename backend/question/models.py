from django.db import models
from django.contrib.auth.models import User

class QuestionSet(models.Model):
  author = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    related_name='questionsets')
  direction = models.TextField(
    max_length=300)
  title = models.CharField(
    max_length=50)

class Question(models.Model):
  question_from = models.ForeignKey(
    QuestionSet,
    on_delete=models.CASCADE,
    related_name='questions'
    )
  
  question_text = models.CharField(
    max_length=200)
    
  answer = models.CharField(max_length=50)
  
class Choice(models.Model):
  choice_text = models.CharField(
    max_length=200)
  
  question = models.ForeignKey(
    Question,
    on_delete=models.CASCADE,
    related_name='choices')