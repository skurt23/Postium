from django.contrib.auth.models import User
from rest_framework import serializers

from posts.models import Post

from categories.serializers import CategorySerializer
from users.serializers import LikeSerializer

from categories.models import Category
from users.models import Like


class PostSerializer(serializers.ModelSerializer):

    author = serializers.SerializerMethodField()
    ratings = serializers.SerializerMethodField()
    likes = LikeSerializer(many=True)
    categoriees = CategorySerializer(many=True)

    def create(self, validated_data):
        category_data = validated_data.pop('categoriees')
        post = Post.objects.create(**validated_data)
        for data_category in category_data:
            print(data_category)
            category = Category.objects.get(name=data_category['name'])
            category.posts.add(post)
        return post

    def update(self, instance, validated_data):
        category_data = validated_data.pop('categoriees')
        likes_data = validated_data.pop('likes')
        instance.title = validated_data['title']
        instance.intro = validated_data['intro']
        instance.body = validated_data['body']
        instance.publication_date = validated_data['publication_date']
        for data_category in category_data:
            category = Category.objects.get(name=data_category['name'])
            category.posts.add(instance)
        for data_like in likes_data:
            like = Like.objects.create(**data_like)
            like.likes.add(instance)
        instance.save()
        return instance

    def get_likes(self, obj):
        return len(obj.likes.all())

    def get_ratings(self, obj):
        ratingArray = []
        for rating in obj.ratings.all():
            ratingArray.append(rating.rate)

        if len(ratingArray) == 0:
            return 0
        else:
            return sum(ratingArray)/len(ratingArray)

    def get_author(self, obj):
        jsonObject = {"firstName": obj.author.first_name,
                      "lastName": obj.author.last_name,
                      "username": obj.author.username,
                      "avatar": obj.author.avatar.avatarUrl,
                      "email": obj.author.email,
                      "id": obj.author.id,
                      }
        return jsonObject

    class Meta:
        model = Post
        fields = ('id', 'title', 'media', 'intro', 'body', 'publication_date', 'modification_date', 'creation_date',
                  'author', 'categoriees', 'ratings', 'likes')


class PostListSerializer(PostSerializer):

    ratings = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    categoriees = CategorySerializer(many=True)

    def create(self, validated_data):
        category_data = validated_data.pop('categoriees')
        print(category_data)
        post = Post.objects.create(**validated_data)
        print(validated_data)
        for data_category in category_data:
            print(data_category)
            category = Category.objects.get(name=data_category['name'])
            category.posts.add(post)
        return post

    def get_likes(self, obj):
        return len(obj.likes.all())

    def get_ratings(self, obj):
        ratingArray = []
        for rating in obj.ratings.all():
            ratingArray.append(rating.rate)

        if len(ratingArray) == 0:
            return 0
        else:
            return sum(ratingArray)/len(ratingArray)

    class Meta(PostSerializer.Meta):
        fields = ('id', 'title', 'media', 'intro', 'body', 'publication_date', 'modification_date', 'creation_date',
                  'author', 'categoriees', 'ratings', 'likes')
