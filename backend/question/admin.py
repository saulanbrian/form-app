from django.contrib import admin
from .models import Question,QuestionSet,Choice

admin.site.register(QuestionSet)
admin.site.register(Question)
admin.site.register(Choice)
