# Generated by Django 3.1.7 on 2021-05-19 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0014_auto_20210519_1826'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='dateFounded',
            field=models.DateField(blank=True, null=True),
        ),
    ]
