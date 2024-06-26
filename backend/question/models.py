from django.db import models
from django.contrib.auth.models import User

class QuestionSet(models.Model):
  author = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    related_name='questionsets')
  title = models.CharField(
    max_length=150)
  description = models.CharField(max_length=150)

class Question(models.Model):
  question_from = models.ForeignKey(
    QuestionSet,
    on_delete=models.CASCADE,
    related_name='questions'
    )
  
  question_text = models.CharField(
    max_length=200)
    
  
class Choice(models.Model):
  choice_text = models.CharField(
    max_length=200)
  
  question = models.ForeignKey(
    Question,
    on_delete=models.CASCADE,
    related_name='choices')
  
  is_correct = models.BooleanField(default=False)