from rest_framework.routers import DefaultRouter
from django.conf.urls import url, include

from posts.api import PostDetailViewSet, PostListViewSet, PostCategoryViewSet


posts = PostDetailViewSet.as_view({
    'get': 'list'
})

postlist = PostListViewSet.as_view({
    'get': 'list'
})

router = DefaultRouter()
router.register('api/1.0/posts/(?P<username>\w+)', PostDetailViewSet, base_name='api_posts_detail')
router.register('api/1.0/categories/(?P<name>\w+)', PostCategoryViewSet, base_name='api_posts_detail')
router.register('api/1.0/posts', PostListViewSet, base_name='api_posts_list')

urlpatterns = [
    url(r'', include(router.urls))
]