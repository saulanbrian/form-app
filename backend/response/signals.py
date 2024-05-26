from django.db.models.signals import pre_save,post_save
from django.dispatch import receiver

from .models import Response

from rest_framework.exceptions import ValidationError

@receiver(pre_save,sender=Response)
def validate_answers(sender,instance,created,**kwargs):
  if instance.answers.count != insatance.question_set.questions.count:
    raise ValidationError({'message':'invalid response'})
    