# Generated by Django 3.2 on 2021-04-28 00:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0014_auto_20210427_2024'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='sourceID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='leads.source'),
        ),
    ]
