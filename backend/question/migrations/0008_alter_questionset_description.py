# Generated by Django 5.0.3 on 2024-05-30 01:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('question', '0007_questionset_description_alter_questionset_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='questionset',
            name='description',
            field=models.CharField(max_length=150),
        ),
    ]