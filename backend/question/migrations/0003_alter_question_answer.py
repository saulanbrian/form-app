# Generated by Django 5.0.3 on 2024-04-27 06:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0002_questionset_direction_questionset_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='answer',
            field=models.CharField(max_length=50),
        ),
    ]