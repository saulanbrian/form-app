from rest_framework.generics import ListCreateAPIView

from .serializers import QuestionSetSerializer

from .models import QuestionSet

class QuestionSetListCreateView(ListCreateAPIView):
  serializer_class = QuestionSetSerializer
  queryset = QuestionSet.objects.all()
