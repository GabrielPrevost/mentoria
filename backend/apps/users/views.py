from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer, UserSerializer
from .models import TeacherProfile


class RegisterView(generics.CreateAPIView):
    """API view for user registration."""
    
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Inscription réussie',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


class ProfileView(generics.RetrieveUpdateAPIView):
    """API view for user profile management."""
    
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    """Get current user profile information."""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_teacher_profile(request):
    """Update teacher profile information."""
    teacher_profile = request.user.teacher_profile
    
    # Update teacher profile fields
    for field in ['commission_scolaire', 'school_name', 'grade_levels', 'subjects', 'phone_number']:
        if field in request.data:
            setattr(teacher_profile, field, request.data[field])
    
    teacher_profile.save()
    
    # Return updated user data
    serializer = UserSerializer(request.user)
    return Response({
        'message': 'Profil mis à jour avec succès',
        'user': serializer.data
    })