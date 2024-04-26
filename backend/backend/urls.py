from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/question',include('question.urls')),
    path('auth/token/',TokenObtainPairView.as_view()),
    path('auth/token/reefresh/',TokenRefreshView.as_view())
]
