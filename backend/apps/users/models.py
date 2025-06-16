from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class TeacherProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile')
    commission_scolaire = models.CharField(
        max_length=200, 
        blank=True, 
        help_text="Commission scolaire d'affiliation"
    )
    school_name = models.CharField(
        max_length=200, 
        blank=True, 
        help_text="École principale où vous travaillez"
    )
    grade_levels = models.JSONField(
        default=list, 
        blank=True,
        help_text="Niveaux enseignés (optionnel)"
    )
    subjects = models.JSONField(
        default=list, 
        blank=True,
        help_text="Matières enseignées (optionnel)"
    )
    phone_number = models.CharField(max_length=20, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profil d'enseignant"
        verbose_name_plural = "Profils d'enseignants"

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username} - {self.commission_scolaire}"

    @property
    def full_name(self):
        return f"{self.user.first_name} {self.user.last_name}".strip() or self.user.username


@receiver(post_save, sender=User)
def create_teacher_profile(sender, instance, created, **kwargs):
    """Automatically create a TeacherProfile when a User is created."""
    if created:
        TeacherProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_teacher_profile(sender, instance, **kwargs):
    """Save the TeacherProfile when User is saved."""
    if hasattr(instance, 'teacher_profile'):
        instance.teacher_profile.save()