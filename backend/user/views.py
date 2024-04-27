from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny

class CustomTokenObtainView(TokenObtainPairView):
  permission_class = [AllowAny]
