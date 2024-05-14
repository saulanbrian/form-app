from rest_framework.generics import ListCreateAPIView, ListAPIView, CreateAPIView
from rest_framework.decorators import api_view

from rest_framework.permissions import IsAuthenticated,AllowAny

from rest_framework.exceptions import ValidationError

from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from .serializers import QuestionSetSerializer, QuestionSerializer

from .models import QuestionSet, Question


class QuestionSetListCreateView(ListAPIView):
  serializer_class = QuestionSetSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    user = self.request.user.id
    return QuestionSet.objects.filter(author=user)

@api_view(['GET','POST'])
def question_list_create(request:Request):
  if request.method == 'POST':
    serializer = QuestionSerializer()
    if serializer.is_valid():
      serializer.save()
    return Response({'message':'post request received'})
  queryset = Question.objects.all()
  serializer = QuestionSerializer(queryset,many=True)
  return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['POST'])
def questionset_create(request:Request):
  serializer = QuestionSetSerializer(data=request.data)
  if request.user.is_anonymous:
    return Response({'message':'who tf are you'})
  if serializer.is_valid():
    serializer.save(author=request.user)
    return Response(serializer.data,status=status.HTTP_201_CREATED)
  return Response(serializer.errors)
  
