# Generated by Django 3.2 on 2021-04-28 01:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0015_alter_post_sourceid'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='post_pics', verbose_name='Post Picture'),
        ),
    ]
