# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-15 21:38
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_auto_20161115_2113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='likes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='post',
            name='rating',
            field=models.ManyToManyField(blank=True, related_name='rating', to='posts.Rating'),
        ),
    ]
