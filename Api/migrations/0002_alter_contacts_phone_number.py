# Generated by Django 4.2.6 on 2023-10-24 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contacts',
            name='phone_number',
            field=models.IntegerField(),
        ),
    ]