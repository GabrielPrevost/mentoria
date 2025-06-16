# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MentorIA is an AI-powered educational platform that helps teachers create exercises, search educational resources, and streamline their teaching workflow. The platform delivers French content while maintaining English for all development aspects.

## Architecture

This is a full-stack application with:
- **Frontend**: Next.js 14+ (App Router) with Tailwind CSS and shadcn/ui components
- **Backend**: Django 4.2+ with Django REST Framework
- **Database**: PostgreSQL
- **Task Queue**: Celery with Redis broker
- **AI Integration**: OpenAI API via LangChain

## Development Commands

### Backend (Django)
```bash
# Setup virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r backend/requirements/development.txt

# Database operations
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Run tests
python manage.py test

# Start Celery worker (separate terminal)
celery -A mentoriaserver worker --loglevel=info

# Start Celery beat scheduler (separate terminal)
celery -A mentoriaserver beat --loglevel=info
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run type-check   # TypeScript checking
```

### Docker
```bash
# Full stack development
docker-compose up --build

# Backend only
docker-compose up backend

# Frontend only  
docker-compose up frontend
```

## Key Directories

- `backend/apps/exercises/` - Exercise creation and management logic
- `backend/apps/curriculum/` - Educational resource search functionality
- `backend/apps/ai_assistant/` - AI integration layer with LangChain/OpenAI
- `frontend/app/dashboard/` - Main application interface
- `frontend/app/exercises/` - Exercise builder UI components
- `frontend/components/features/` - Feature-specific React components

## Environment Configuration

The project uses different settings for development and production:
- `backend/mentoriaserver/settings/development.py` - Development settings
- `backend/mentoriaserver/settings/production.py` - Production settings
- Environment variables should be configured for API keys, database connections, and Redis settings

## Content Language

The application delivers content in French for end users, but all code, comments, documentation, and development artifacts should be in English.

## AI Integration

The platform integrates with OpenAI API through LangChain for exercise generation and educational content assistance. AI-related functionality is centralized in the `ai_assistant` app.