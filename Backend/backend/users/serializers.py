from rest_framework import serializers

from users.models import Like

class LikeSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        author_json={
            'id': obj.user.id,
            'username': obj.user.username,
        }
        return author_json
    class Meta:
        model = Like
        fields = ('id', 'user')