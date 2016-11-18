from django.contrib.auth.models import User
from rest_framework import viewsets, mixins, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.viewsets import ModelViewSet

from django.utils import timezone

from posts.permissions import PostPermission
from posts.serializers import PostListSerializer, PostSerializer
from posts.views import PostQueryset, PostListApiQueryset, PostCategoryQueryset


class PostDetailViewSet(ModelViewSet):
    """
    Endpoint de artículos. Un usuario no autenticado sólo podrá ver los artículos publicados

    Para crear un artículo tendrás que estar autenticado y el artículo se publicará inmediatamente en tu blog.

    Si se desea actualizar o eliminar un artículo debe hacerlo el propietario de ese artículo o un administrador
    """
    permission_classes = (IsAuthenticatedOrReadOnly, PostPermission)
    search_fields = ('title', 'intro',)
    order_fields = ('title', 'publication_date', 'categories')
    ordering = ('-publication_date',)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter,)

    def get_queryset(self):
        return PostQueryset.get_articles_by_user(self.request.user, self.kwargs['username'])

    def get_serializer_class(self):
        if self.action != 'list':
            return PostSerializer
        else:
            return PostListSerializer


    def perform_create(self, serializer):
        return serializer.save(author=self.request.user, publication_date=timezone.now())

    def perform_update(self, serializer):
        user = User.objects.filter(username=self.kwargs['username'])
        return serializer.save(author=user[0])

class PostCategoryViewSet(ModelViewSet):
    """
    Endpoint de artículos. Un usuario no autenticado sólo podrá ver los artículos publicados

    Para crear un artículo tendrás que estar autenticado y el artículo se publicará inmediatamente en tu blog.

    Si se desea actualizar o eliminar un artículo debe hacerlo el propietario de ese artículo o un administrador
    """
    permission_classes = (IsAuthenticatedOrReadOnly, PostPermission)
    search_fields = ('title', 'intro',)
    order_fields = ('title', 'publication_date', 'categories')
    ordering = ('-publication_date',)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter,)

    def get_queryset(self):
        return PostCategoryQueryset.get_articles_by_category(self.kwargs['name'])

    def get_serializer_class(self):
        if self.action != 'list':
            return PostSerializer
        else:
            return PostListSerializer


    def perform_create(self, serializer):
        return serializer.save(author=self.request.user, publication_date=timezone.now())

    def perform_update(self, serializer):
        user = User.objects.filter(username=self.kwargs['username'])
        return serializer.save(author=user[0], publication_date=timezone.now())

class PostListViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.CreateModelMixin,
                      viewsets.GenericViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly, PostPermission)
    search_fields = ('title', 'intro')
    order_fields = ('title', 'publication_date', 'categoriees', 'author')
    ordering = ('-publication_date',)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter,)

    def get_queryset(self):
        return PostListApiQueryset.get_articles_by_user(self.request.user, self.request.user.username)

    def get_serializer_class(self):
        return PostListSerializer

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)
