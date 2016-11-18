from django.contrib.auth.models import User
from django.db import models

from categories.models import Category
from users.models import  Like


class Post(models.Model):
    title = models.CharField(max_length=150)
    intro = models.CharField(max_length=500)
    body = models.TextField()
    media = models.CharField(max_length=200)
    creation_date = models.DateTimeField(auto_now_add=True)
    publication_date = models.DateTimeField()
    modification_date = models.DateTimeField(auto_now=True)
    categoriees = models.ManyToManyField(Category, related_name='posts')
    author = models.ForeignKey(User, related_name='posts')
    likes = models.ManyToManyField(Like, related_name='likes', blank=True)

    def __str__(self):
        return self.title

class Rating(models.Model):

    rate = models.FloatField()
    author = models.ForeignKey(User)
    post = models.ForeignKey(Post, related_name='ratings')

    def __str__(self):
        return self.author.username
