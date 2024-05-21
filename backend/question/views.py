from rest_framework.generics import ListCreateAPIView, ListAPIView, CreateAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.decorators import api_view

from rest_framework.permissions import IsAuthenticated,AllowAny

from rest_framework.exceptions import ValidationError

from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from .serializers import QuestionSetSerializer, QuestionSerializer,UserSerializer

from .models import QuestionSet, Question


class QuestionSetListCreateView(ListCreateAPIView):
  serializer_class = QuestionSetSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    user = self.request.user.id
    return QuestionSet.objects.filter(author=user)
    
  def perform_create(self,serializer):
    user = self.request.user
    serializer.save(author=user)
    

class QuestionUpdateView(UpdateAPIView):
  serializer_class = QuestionSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    user = self.request.user.id
    return Question.objects.filter(question_from__author=user)
  

class QuestionSetUpdateView(UpdateAPIView):
  serializer_class = QuestionSetSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    return QuestionSet.objects.filter(author=self.request.user.id)


class UserCreationView(CreateAPIView):
  serializer_class = UserSerializer
  




@api_view(['GET','POST'])
def question_list_create(request:Request):
  if request.method == 'POST':
    serializer = QuestionSerializer()
    if serializer.is_valid():
      serializer.save()
    return Response({'message':'post request received'})
  questionnaire_id = request.query_params.get('formId',None)
  questionnaire = QuestionSet.objects.get(pk=questionnaire_id)
  serializer = QuestionSetSerializer(questionnaire)
  return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['POST'])
def questionset_create(request:Request):
  serializer = QuestionSetSerializer(data=request.data)
  if request.user.is_anonymous:
    return Response({'message':'who tf are you'},status=status.HTTP_401_UNAUTHORIZED)
  if serializer.is_valid():
    serializer.save(author=request.user)
    return Response(serializer.data,status=status.HTTP_201_CREATED)
  return Response(serializer.errors)
  
