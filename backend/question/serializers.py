from rest_framework import serializers
from .models import QuestionSet,Question,Choice

from rest_framework.exceptions import ValidationError

    
class ChoiceSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Choice
    fields = ('choice_text','is_correct')

    
class QuestionSerializer(serializers.ModelSerializer):
  
  choices = ChoiceSerializer(many=True)
  
  class Meta:
    model = Question
    fields = ('id','question_text','choices')
    extra_kwargs = {
      'id':{'read_only':True}
    }
    

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




from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username

        return token
        