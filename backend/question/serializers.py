from rest_framework import serializers
from .models import QuestionSet,Question,Choice

    
class ChoiceSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Choice
    fields = ('choice_text',)

    
class QuestionSerializer(serializers.ModelSerializer):
  
  choices = ChoiceSerializer(many=True)
  
  class Meta:
    model = Question
    fields = ('question_text','answer','choices')


class QuestionSetSerializer(serializers.ModelSerializer):
  
  questions = QuestionSerializer(many=True)
  
  class Meta:
    model = QuestionSet
    fields = ('author','questions')
  
  def create(self,validated_data):
    questions = validated_data.pop('questions',[])
    question_set = QuestionSet.objects.create(**validated_data)
    for question in questions:
      choices = question.pop('choices',[])
      new_question = Question.objects.create(
          question_from=question_set,
          **question)
      for choice in choices:
        Choice.objects.create(
          question=new_question,
          **choice)
    return question_set