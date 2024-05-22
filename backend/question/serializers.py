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
      'id':{'required':False}
    }

    
class QuestionSerializer(serializers.ModelSerializer):
  
  choices = ChoiceSerializer(many=True)
  
  class Meta:
    model = Question
    fields = ('id','question_text','choices')
    extra_kwargs = {
      'id':{'required':False}
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
        serializer.save()
      
    instance.question_text(validated_data.get('question_text'),instance.question_text)
    instance.save()
    return instance

class QuestionSetSerializer(serializers.ModelSerializer):
  
  questions = QuestionSerializer(many=True)
  
  class Meta:
    model = QuestionSet
    fields = ('id','author','title','questions')
    extra_kwargs = {
      'id':{'required':False},
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
    print(validated_data)
    q_id = validated_data.pop('id',None)
    print(q_id)
    instance.title = validated_data.get('title',instance.title)
    
    # questions_data = validated_data.pop('questions',[])
#     for question_data in questions_data:
#       question_id = question_data.pop('id',None)
#       question = Question.objects.get(pk=question_id)
#       question.question_text = validated_data.get('question_text',question.question_text)
#       question.save()
      # choices_data = validated_data.pop('choices',[])
#       if question_id:
#         question = Question.objects.get(pk=question_id)
#         serializer = QuestionSerializer(question,data=question_data,partial=True)
#         if serializer.is_valid():
#           serializer.save()
#       else:
#         Question.objects.create(**question_data)
#     
#       for choice_data in choices_data:
#         choice_id = choice_data.pop('id',None)
#         if choice_id:
#           choice = Choice.objects.get(pk=choice_id)
#           serializer = ChoiceSerializer(choice,data=choice_data,partial=True)
#           if serializer.is_valid():
#             serializer.save()
#         else:
#           Choice.objects.create(**choice_data,question=question)
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
        