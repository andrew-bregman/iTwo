# Generated by Django 3.1.7 on 2021-05-01 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0004_auto_20210430_0729'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='lookingFor',
            field=models.TextField(blank=True, null=True),
        ),
    ]
