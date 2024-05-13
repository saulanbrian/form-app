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
    fields = ('question_from','question_text','choices')
    
  def create(self,validated_data):
    question_from = validated_data.pop('question_from',[])
    choices = validated_data.pop('choiches',[])
    
    question_set = QuestionSet.objects.get(pk=question_from)
    question = Question.objects.create(
      **validated_data,question_from=question_from)
    for choice in choices:
      choice = Choice.objects.create(**choice,question=question)

class QuestionSetSerializer(serializers.ModelSerializer):
  
  questions = QuestionSerializer(many=True)
  
  class Meta:
    model = QuestionSet
    fields = ('id','author','title','questions')
    extra_kwargs = {
      'questions':{'read_only':True},
      'id':{'read_only':True}
      }



from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username

        return token
        
        # class QuestionSetSerializer(serializers.ModelSerializer):
#   
#   questions = QuestionSerializer(many=True)
#   
#   class Meta:
#     model = QuestionSet
#     fields = ('author','questions')
#   
#   def create(self,validated_data):
#     questions = validated_data.pop('questions',[])
#     question_set = QuestionSet.objects.create(**validated_data)
#     for question in questions:
#       choices = question.pop('choices',[])
#       new_question = Question.objects.create(
#           question_from=question_set,
#           **question)
#       has_answer = False
#       for choice in choices:
#         choice = Choice.objects.create(
#           question=new_question,
#           **choice)
#         if choice.is_correct:
#           has_answer = True
#       if not has_answer:
#         question_set.delete()
#         raise ValidationError({'message':'cant make a question without a default answer'})
#     return question_set