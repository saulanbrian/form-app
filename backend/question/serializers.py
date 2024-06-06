from rest_framework import serializers
from .models import QuestionSet,Question,Choice
from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password

from rest_framework.exceptions import ValidationError
from django.core.exceptions import ValidationError as ModelValidationError

import json

    
class ChoiceSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Choice
    fields = ('id','choice_text','is_correct')
    
class QuestionSerializer(serializers.ModelSerializer):
  
  choices = ChoiceSerializer(many=True)
  
  class Meta:
    model = Question
    fields = ('id','question_text','choices')
    

class QuestionSetSerializer(serializers.ModelSerializer):
  
  questions = QuestionSerializer(many=True)
  
  class Meta:
    model = QuestionSet
    fields = ('id','author','title','description','questions')
    extra_kwargs = {
      'author':{'read_only':True},
      }

  
  def create(self,validated_data):
    questions = validated_data.pop('questions',[])
    question_set = QuestionSet.objects.create(**validated_data)
    for question in questions:
      choices = question.pop('choices',[])
      question = Question.objects.create(question_from=question_set,**question)
      for choice in choices:
        choice = Choice.objects.create(question=question,**choice)
    return question_set
  


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username','password')
  
  def create(self,validated_data):
    password_data = validated_data.pop('password')
    password = make_password(password_data)
    return User.objects.create(password=password,**validated_data)

    


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username

        return token
        