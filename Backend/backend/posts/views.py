from posts.models import Post
from django.utils import timezone


# Create your views here.

class PostQueryset(object):

    @staticmethod
    def get_articles_by_user(user, username):
        post = Post.objects.all().select_related("author")

        if not user.is_authenticated():
            post = post.filter(publication_date__lte=timezone.now(), author__username=username)
        elif not user.is_superuser:
            if user.username == username:
                post = post.filter(author=user)
            else:
                post = post.filter(publication_date__lte=timezone.now(), author__username=username)
        else:
            post = post.filter(author__username=username)
        return post

class PostCategoryQueryset(object):

    @staticmethod
    def get_articles_by_category(name):
        post = Post.objects.all()
        if name == 'PoorThing':
            name = 'Poor Thing'
        if name == 'EstoEsSerio':
            name = 'Esto es serio'
        post = post.filter(categoriees__name=name, publication_date__lte=timezone.now())
        return post


class PostListApiQueryset(object):

    @staticmethod
    def get_articles_by_user(user, username):
        post = Post.objects.all().select_related("author")
        print(user)
        if not user.is_authenticated():
            post = post.filter(publication_date__lte=timezone.now())
            print('hola')
        elif not user.is_superuser:
            post = post.filter(publication_date__lte=timezone.now())
            print('adios')
        else:
            post = Post.objects.all()
        return post

