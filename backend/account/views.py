from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,generics
from .models import Account,ContactMessage,AdminDetails
from .serializers import AccountSerializer,ContactMessageSerializer,AdminDetailsSerializer,AccountProfileSerializer,ChangePasswordSerializer
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import send_mail
from django.core.exceptions import MultipleObjectsReturned
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json


@api_view(['POST'])
def register_user(request):
    data = request.data
    # check if email already exists
    if Account.objects.filter(email=data['email']).exists():
        return Response({'error': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)

    # create new account
    account = Account(
        username=data['username'],
        email=data['email'],
        password=make_password(data['password'])  # store hashed password
    )
    account.save()

    serializer = AccountSerializer(account)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

# @api_view(['POST'])
# def login_user(request):
#     data = request.data
#     try:
#         account = Account.objects.get(email=data['email'])
#     except Account.DoesNotExist:
#         return Response({'error': 'Invalid email or password.'}, status=status.HTTP_400_BAD_REQUEST)

#     if check_password(data['password'], account.password):
#         return Response({'message': 'Login successful!'}, status=status.HTTP_200_OK)
#     else:
#         return Response({'error': 'Invalid email or password.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    data = request.data
    try:
        account = Account.objects.get(email=data['email'])
    except Account.DoesNotExist:
        return Response({'error': 'Invalid email or password.'}, status=status.HTTP_400_BAD_REQUEST)

    if check_password(data['password'], account.password):
        return Response({
            'message': 'Login successful!',
            'username': account.username  # Include username here
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid email or password.'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def contact_message(request):
    data = request.data
    username = data.get('username', None)  # get username from request

    try:
        serializer = ContactMessageSerializer(data=data)
        if serializer.is_valid():
            user = None
            if username:
                try:
                    user = Account.objects.get(username=username)
                except Account.DoesNotExist:
                    user = None
                except MultipleObjectsReturned:
                    user = Account.objects.filter(username=username).first()

            # Save contact without user first
            contact = serializer.save()

            # Now set user and save again if user found
            if user:
                contact.user = user
                contact.save()

            # Send emails
            send_mail(
                subject='New Contact Message - AgroTech',
                message=f"From: {contact.name}\nEmail: {contact.email}\nMessage:\n{contact.message}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.DEFAULT_FROM_EMAIL],
                fail_silently=False,
            )
            send_mail(
                subject='Thank you for contacting AgroTech!',
                message=f"Hi {contact.name},\n\nWe received your message and will get back to you soon.\n\n- AgroTech Team",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[contact.email],
                fail_silently=False,
            )

            return Response({'message': 'Message saved and email sent!'}, status=201)

        else:
            return Response(serializer.errors, status=400)

    except Exception as e:
        return Response({'error': 'Internal server error', 'details': str(e)}, status=500)
    

# sign up admin
@api_view(['POST'])
def admin_signup_api(request):
    email = request.data.get('email')
    if AdminDetails.objects.filter(email=email).exists():
        return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = AdminDetailsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Admin registered successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# admin
@api_view(['POST'])
def admin_login_api(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        admin_user = AdminDetails.objects.get(email=email)
        if password == admin_user.password:
            serializer = AdminDetailsSerializer(admin_user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
    except AdminDetails.DoesNotExist:
        return Response({'error': 'Admin not found'}, status=status.HTTP_404_NOT_FOUND)
    
# admin dashboard
@api_view(['GET'])
def admin_dashboard_api(request):
    return Response({"message": "Welcome to the Admin Dashboard"}, status=status.HTTP_200_OK)

# CURD Operations

@api_view(['GET'])
def get_accounts(request):
    users = Account.objects.all()
    serializer = AccountSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def update_account(request, pk):
    try:
        user = Account.objects.get(pk=pk)
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = AccountSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_account(request, pk):
    try:
        user = Account.objects.get(pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
class AccountListCreateView(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class AccountRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

# message

class MyContactMessagesView(APIView):
    def get(self, request):
        username = request.query_params.get('username')
        if not username:
            return Response({'error': 'Username query parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            account = Account.objects.get(username=username)
        except Account.DoesNotExist:
            return Response({'error': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)

        messages = ContactMessage.objects.filter(user=account).order_by('-created_at')
        serializer = ContactMessageSerializer(messages, many=True)
        return Response(serializer.data)
    
# profile

class UserProfileAPIView(APIView):
    """
    GET /api/profile/?username=<username>
    """
    def get(self, request):
        username = request.query_params.get("username")
        if not username:
            return Response({"error": "Username is required."},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Account.objects.get(username=username)
        except Account.DoesNotExist:
            return Response({"error": "User not found."},
                            status=status.HTTP_404_NOT_FOUND)

        data = AccountProfileSerializer(user).data
        return Response(data)
    
# password

@csrf_exempt
@require_POST
def change_password(request):
    try:
        data = json.loads(request.body)
        print("Received data:", data)  # debug log

        email = data.get('email')
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        if not email or not old_password or not new_password:
            return JsonResponse({'success': False, 'message': 'All fields are required'}, status=400)

        try:
            user = Account.objects.get(email=email)
        except Account.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'User not found'}, status=404)

        if not user.check_password(old_password):
            return JsonResponse({'success': False, 'message': 'Incorrect old password'}, status=400)

        user.set_password(new_password)
        return JsonResponse({'success': True, 'message': 'Password changed successfully'})

    except Exception as e:
        print("Exception occurred:", e)  # log the error
        return JsonResponse({'success': False, 'message': str(e)}, status=500)
