# Generated by Django 5.0.3 on 2024-05-23 09:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0006_remove_questionset_direction'),
        ('response', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='response',
            name='question_set',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='question.questionset'),
        ),
    ]
