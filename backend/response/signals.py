from django.db.models.signals import pre_save,post_save
from django.dispatch import receiver

from .models import Response
from question.models import Choice

from rest_framework.exceptions import ValidationError

# @receiver(pre_save,sender=Response)
# def validate_answers(sender,instance,created,**kwargs):
#   if instance.answers.count != insatance.question_set.questions.count:
#     raise ValidationError({'message':'invalid response'})
# 
# @receiver(post_save,sender=Response)
# def calculate_score(sender,instance,created,**kwargs):
#   if created:
#     answers = instance.answers.all()
#     print(instance.answers)
#     if answers:
#       print(answers)
#     for answer in answers:
#       print(answer.is_correct)
#       if answer.is_correct:
#         instance.correct_answers.add(answer)
#         instance.save()