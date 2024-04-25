from django.contrib import admin
from .models import Question,Answer,QuestionSet,Choice

admin.site.register(QuestionSet)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Choice)
