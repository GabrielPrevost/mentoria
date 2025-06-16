from .base import *

DEBUG = True

# INSTALLED_APPS += [
#     'django_debug_toolbar',
# ]

# MIDDLEWARE += [
#     'debug_toolbar.middleware.DebugToolbarMiddleware',
# ]

INTERNAL_IPS = [
    '127.0.0.1',
    'localhost',
]

# Use console email backend for development
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'