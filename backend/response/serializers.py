from rest_framework import serializers

from .models import Response

from question.serializers import ChoiceSerializer

class ResponseSerializer(serializers.ModelSerializer):

  class Meta:
    model = Response
    fields = ('id','user','question_set','answers','correct_answers')
    extra_kwargs = {
      'user':{'read_only':True},
      'correct_answers':{'read_only':True}
    }
    