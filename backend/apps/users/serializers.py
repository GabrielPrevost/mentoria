from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import TeacherProfile


class TeacherProfileSerializer(serializers.ModelSerializer):
    """Serializer for TeacherProfile model."""
    
    class Meta:
        model = TeacherProfile
        fields = [
            'commission_scolaire',
            'school_name', 
            'grade_levels',
            'subjects',
            'phone_number'
        ]


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration with teacher profile."""
    
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    teacher_profile = TeacherProfileSerializer()
    
    class Meta:
        model = User
        fields = [
            'username',
            'email', 
            'first_name',
            'last_name',
            'password',
            'password_confirm',
            'teacher_profile'
        ]
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
        }
    
    def validate(self, attrs):
        """Validate that passwords match."""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({
                'password_confirm': 'Les mots de passe ne correspondent pas.'
            })
        return attrs
    
    def validate_email(self, value):
        """Validate that email is unique."""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Un utilisateur avec cette adresse email existe déjà.')
        return value
    
    def create(self, validated_data):
        """Create user and teacher profile."""
        teacher_profile_data = validated_data.pop('teacher_profile')
        validated_data.pop('password_confirm')
        
        # Create user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )
        
        # Update teacher profile (created automatically by signal)
        teacher_profile = user.teacher_profile
        for key, value in teacher_profile_data.items():
            setattr(teacher_profile, key, value)
        teacher_profile.save()
        
        return user


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user details."""
    
    teacher_profile = TeacherProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name', 
            'last_name',
            'date_joined',
            'teacher_profile'
        ]