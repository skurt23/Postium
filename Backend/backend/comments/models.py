from django.contrib.auth.models import User
from django.db import models

from posts.models import Post


class Comment(models.Model):

    author = models.ForeignKey(User, related_name='comments')
    text = models.TextField()
    post = models.ForeignKey(Post, related_name='comments')

    def __str__(self):
        return self.author.username
