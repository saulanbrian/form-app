from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView
from question.views import UserCreationView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/question/',include('question.urls')),
    path('auth/token/',TokenObtainPairView.as_view()),
    path('auth/token/refresh/',TokenRefreshView.as_view()),
    path('account/create/',UserCreationView.as_view()),
]
