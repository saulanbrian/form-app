from django.db import models
from django.contrib.auth.models import User


class Answer(models.Model):
  answer_text = models.CharField(
    max_length=200)

class QuestionSet(models.Model):
  author = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    related_name='questionsets')

class Question(models.Model):
  question_from = models.ForeignKey(
    QuestionSet,
    on_delete=models.CASCADE,
    related_name='questions'
    )
  
  question_text = models.CharField(
    max_length=200)
    
  answer = models.OneToOneField(Answer,
  on_delete=models.CASCADE)
  
class Choice(models.Model):
  choice_text = models.CharField(
    max_length=200)
  
  question = models.ForeignKey(
    Question,
    on_delete=models.CASCADE,
    related_name='choices')