from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from .models import Question,Choice

from rest_framework.exceptions import ValidationError

@receiver(post_save,sender=Choice)
def update_choice(sender,instance,**kwargs):
  if instance.is_correct:
    choices = instance.question.choices.exclude(id=instance.pk)
    for choice in choices:
      choice.is_correct = False
      choice.save()

