# Generated by Django 5.0.3 on 2024-05-28 08:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('response', '0004_response_correct_answers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='response',
            name='correct_answers',
        ),
    ]
