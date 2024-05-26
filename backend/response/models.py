from django.db import models

from question.models import QuestionSet,Choice
from django.contrib.auth.models import User

class Response(models.Model):
  user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='responses')
  question_set = models.ForeignKey(QuestionSet,on_delete=models.CASCADE,related_name='responses')
  answers = models.ManyToManyField(Choice)
