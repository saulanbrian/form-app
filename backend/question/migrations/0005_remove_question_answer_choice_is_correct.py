# Generated by Django 5.0.3 on 2024-05-03 05:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0004_delete_answer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='answer',
        ),
        migrations.AddField(
            model_name='choice',
            name='is_correct',
            field=models.BooleanField(default=False),
        ),
    ]