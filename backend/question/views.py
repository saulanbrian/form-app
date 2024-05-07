from rest_framework.generics import ListCreateAPIView
from rest_framework.decorators import api_view

from rest_framework.permissions import IsAuthenticated,AllowAny

from rest_framework.exceptions import ValidationError

from rest_framework.response import Response

from .serializers import QuestionSetSerializer

from .models import QuestionSet


class QuestionSetListCreateView(ListCreateAPIView):
  serializer_class = QuestionSetSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    user = self.request.user.id
    return QuestionSet.objects.filter(author=user)
    

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
