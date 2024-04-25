from rest_framework import serializers
from .models import QuestionSet,Question,Answer,Choice

class AnswerSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Answer
    fields = ('answer_text',)
    
    
class ChoiceSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Choice
    fields = ('choice_text',)

    
class QuestionSerializer(serializers.ModelSerializer):
  
  answer = AnswerSerializer()
  choices = ChoiceSerializer(many=True)
  
  class Meta:
    model = Question
    fields = ('question_text','answer','choices')



class QuestionSetSerializer(serializers.ModelSerializer):
  
  questions = QuestionSerializer(many=True)
  
  class Meta:
    model = QuestionSet
    fields = ('author','questions')