from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import random
from datetime import datetime, timedelta
from django.http import JsonResponse
import json
from django.core.cache import cache

@csrf_exempt
def otp_page(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Get JSON data from request
            email = data.get('email', '')
            if not email:
                return JsonResponse({'error': 'Email is required'}, status=400)
            else:
                otp = str(random.randint(100000, 999999))
                
                cache.set(f"otp_{email}", otp, timeout=300)  # Store OTP in cache for 5 minutes
                print("Cache OTP set:", cache.get(f"otp_{email}"))
                
                try:    
                    send_mail(
                        'Your OTP Code',
                        f'Your OTP is: {otp} (valid for 5 minutes)',
                        settings.EMAIL_HOST_USER,
                        [email],
                        fail_silently=False  # This ensures errors are raised
                    )
                    message = f'OTP sent to {email}.'
                except Exception as e:
                    print("Error sending email:", e)
                    message = f'Failed to send OTP: {str(e)}'
                return JsonResponse({'message': email,'status': otp,})
        except Exception as e:
            print("❌ Error parsing request:", e)
            return JsonResponse({'error': 'Invalid request format'}, status=400)

    return JsonResponse({'error': 'Only POST requests allowed'}, status=405)


@csrf_exempt
def verify(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)  # Get JSON data from request
            email = data.get('email', '')
            input_otp = data.get('otp', '')
            stored_otp = cache.get(f"otp_{email}")

            if not input_otp:
                return JsonResponse({'error': 'Please enter the OTP'}, status=400)
            elif input_otp != stored_otp:
                return JsonResponse({'error': 'OTP mismatch', 'input_otp': input_otp, 'stored_otp': stored_otp}, status=400)
            else:
                return JsonResponse({'message': 'OTP verified successfully ✅'})
        except Exception as e:
            print("❌ Error parsing request:", e)
            return JsonResponse({'error': 'Invalid request format'}, status=400)

    return JsonResponse({'error': 'Only POST requests allowed'}, status=405)

@csrf_exempt
def otp_page12(request):
    message = ''

    if request.method == 'POST':
        if 'send_otp' in request.POST:
            email = request.POST.get('email')
            if not email:
                message = 'Email is required.'
            else:
                otp = str(random.randint(100000, 999999))
                request.session['otp'] = otp
                request.session['email'] = email
                request.session['otp_created_at'] = datetime.now().isoformat()
                request.session.modified = True  # Ensure session is marked as modified

                try:
                    send_mail(
                        'Your OTP Code',
                        f'Your OTP is: {otp} (valid for 5 minutes)',
                        settings.EMAIL_HOST_USER,
                        [email],
                        fail_silently=False  # This ensures errors are raised
                    )
                    message = f'OTP sent to {email}.'
                except Exception as e:
                    print("Error sending email:", e)
                    message = f'Failed to send OTP: {str(e)}'

        elif 'verify_otp' in request.POST:
            input_otp = request.POST.get('otp')
            stored_otp = request.session.get('otp')
            created_at = request.session.get('otp_created_at')

            if not input_otp:
                message = 'Please enter the OTP.'
            elif input_otp != stored_otp:
                message = 'Invalid OTP.'
            else:
                if created_at:
                    created_time = datetime.fromisoformat(created_at)
                    if datetime.now() > created_time + timedelta(minutes=5):
                        message = 'OTP expired.'
                    else:
                        message = 'OTP verified successfully ✅'

    return render(request, 'otp_page.html', {'message': message})
