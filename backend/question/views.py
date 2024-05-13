from rest_framework.generics import ListCreateAPIView
from rest_framework.decorators import api_view

from rest_framework.permissions import IsAuthenticated,AllowAny

from rest_framework.exceptions import ValidationError

from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from .serializers import QuestionSetSerializer, QuestionSerializer

from .models import QuestionSet, Question


class QuestionSetListCreateView(ListCreateAPIView):
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

# class QuestionSetListCreateView(ListCreateAPIView):
#   serializer_class = QuestionSetSerializer
#   queryset = QuestionSet.objects.all()
#   permission_classes = [AllowAny]
#   
#   def create(self,request,*args,**kwargs):
#     try:
#       super().create(request,*args,**kwargs)
#     except ValidationError as e:
#       return Response({'message':str(e.detail['message'])},status=400)
