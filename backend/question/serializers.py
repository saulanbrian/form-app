from rest_framework import serializers
from .models import QuestionSet,Question,Choice
from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password

from rest_framework.exceptions import ValidationError

    
class ChoiceSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Choice
    fields = ('id','choice_text','is_correct')
    extra_kwargs = {
      'id':{'read_only':True}
    }

    
class QuestionSerializer(serializers.ModelSerializer):
  
  choices = ChoiceSerializer(many=True)
  
  class Meta:
    model = Question
    fields = ('id','question_text','choices')
    extra_kwargs = {
      'id':{'read_only':True}
    }
    
  def update(self,instance,validated_data):
    validated_data.pop('id',[])
    choices_data = validated_data.get('choiches',[])
    for data in choices_data:
      choice_id = data.pop('id')
      choice = instance.choices.get(id=choice_id)
      serializer = ChoiceSerializer(choice,data=data,partial=True)
      if serializer.is_valid():
        serializer.update()
      
    instance.question_text(validated_data.get('question_text'),instance.question_text)
    instance.save()
    return instance

class QuestionSetSerializer(serializers.ModelSerializer):
  
  questions = QuestionSerializer(many=True)
  
  class Meta:
    model = QuestionSet
    fields = ('id','author','title','questions')
    extra_kwargs = {
      'id':{'read_only':True},
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
  
  
  def update(self,instance,validated_data):
    validated_data.pop('author',[])
    validated_data.pop('id',[])
    
    question_datas = validated_data.pop('questions',[])
    for question_data in question_datas:
      question_id = question_data.pop('id')
      question = question.choices.get(pk=question_id)
      serializer = QuestionSerializer(question,data=question_data,partial=True)
      if serializer.is_valid():
        serializer.update()
    
    instance.title = validated_data.get('title',instance.title)
    instance.save()
    return instance


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
        