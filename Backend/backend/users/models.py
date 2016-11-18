from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Avatar(models.Model):

    avatarUrl = models.CharField(max_length=200)
    user = models.OneToOneField(User, related_name='avatar')

    def __str__(self):
        return self.user.username

class Like(models.Model):
    user = models.OneToOneField(User, related_name='like')

    def __str__(self):
        return self.user.username
