from django.urls import path
from . import views
from .views import otp_page
from .views import otp_page12
from .views import verify



urlpatterns = [
    # path('', views.home, name='home'),
    path('api/otp_page', otp_page, name='otp_page'),
    path('otp_page12', otp_page12, name='otp_page12'),
    path('api/verify', verify, name='verify'),
]
