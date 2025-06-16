from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import TeacherProfile


class TeacherProfileInline(admin.StackedInline):
    """Inline admin for TeacherProfile."""
    model = TeacherProfile
    can_delete = False
    verbose_name_plural = "Profil d'enseignant"
    fields = [
        'commission_scolaire',
        'school_name', 
        'grade_levels',
        'subjects',
        'phone_number',
        'is_verified'
    ]


class CustomUserAdmin(UserAdmin):
    """Custom User admin with TeacherProfile inline."""
    inlines = (TeacherProfileInline,)
    list_display = [
        'username', 
        'email', 
        'first_name', 
        'last_name', 
        'get_commission_scolaire',
        'get_school_name',
        'is_staff'
    ]
    list_filter = UserAdmin.list_filter + ('teacher_profile__commission_scolaire',)
    
    def get_commission_scolaire(self, obj):
        return obj.teacher_profile.commission_scolaire if hasattr(obj, 'teacher_profile') else '-'
    get_commission_scolaire.short_description = 'Commission Scolaire'
    
    def get_school_name(self, obj):
        return obj.teacher_profile.school_name if hasattr(obj, 'teacher_profile') else '-'
    get_school_name.short_description = 'École'


@admin.register(TeacherProfile)
class TeacherProfileAdmin(admin.ModelAdmin):
    """Admin for TeacherProfile model."""
    list_display = [
        'user',
        'commission_scolaire',
        'school_name',
        'is_verified',
        'created_at'
    ]
    list_filter = [
        'commission_scolaire',
        'is_verified',
        'created_at'
    ]
    search_fields = [
        'user__username',
        'user__email',
        'user__first_name',
        'user__last_name',
        'commission_scolaire',
        'school_name'
    ]
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Utilisateur', {
            'fields': ('user',)
        }),
        ('Informations scolaires', {
            'fields': (
                'commission_scolaire',
                'school_name',
                'grade_levels',
                'subjects'
            )
        }),
        ('Contact', {
            'fields': ('phone_number',)
        }),
        ('Statut', {
            'fields': ('is_verified',)
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )


# Unregister the default User admin and register our custom one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)