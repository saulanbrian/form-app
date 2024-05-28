from django.shortcuts import render

from .models import Response

from .serializers import ResponseSerializer

from rest_framework.permissions import IsAuthenticated

from rest_framework.generics import ListCreateAPIView, RetrieveAPIView

class ResponseListCreateView(ListCreateAPIView):
  serializer_class = ResponseSerializer
  queryset = Response.objects.all()
  permission_classes = [IsAuthenticated]
  
  def perform_create(self,serializer):
    user = self.request.user
    serializer.save(user=user)

class ResponseRetrieveView(RetrieveAPIView):
  serializer_class = ResponseSerializer
  permission_classes = [IsAuthenticated]
  
  def get_queryset(self):
    return Response.objects.filter(user=self.request.user)

