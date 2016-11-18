from django.contrib import admin

# Register your models here.
from django.utils.safestring import mark_safe

from posts.models import Post, Rating


class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'publication_date', 'intro',)
    list_filter = ('categoriees',)
    search_fields = ('title', 'author__username', 'body', 'intro')
    readonly_fields = ('creation_date', 'modification_date')

    fieldsets = (
        ("Title and description", {
            'fields': ('title', 'intro', 'body'),
            'classes': ('wide',)
        }),
        ('Author', {
            'fields': ('author',),
            'classes': ('wide',)
        }),
        ('Media', {
            'fields': ('media',),
            'classes': ('wide',)
        }),
        ('Categories', {
            'fields': ('categoriees',),
            'classes': ('wide', 'collapse')
        }),
        ('Date', {
            'fields': ('publication_date', 'modification_date'),
            'classes': ('wide',)
        })
    )

admin.site.register(Post, PostAdmin)
admin.site.register(Rating)
