from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from. serializers import *
from .models import *
from rest_framework.authentication import SessionAuthentication
from rest_framework import permissions, status
from .validations import *
# Create your views here.

@api_view(['GET','POST'])
def get_or_create_contacts(request):
    if request.method == "GET":
        contacts = Contacts.objects.all()
        if contacts:
            try:
                serializer = ContactsSerializer(contacts, many=True)
                return Response({'status': status.HTTP_200_OK, 'data': serializer.data}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'data': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'status': status.HTTP_400_BAD_REQUEST, 'data': 'No contacts found'}, status=status.HTTP_400_BAD_REQUEST)\
    
    if request.method == "POST":
        try:
            serializer = ContactsSerializer(data=request.data)
            print(request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({'status': status.HTTP_200_OK, 'data': "Data created"}, status=status.HTTP_200_OK)
            else:
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'data': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'status': status.HTTP_400_BAD_REQUEST, 'data': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['POST'])
def edit_contact(request,id):
	if request.method == "POST":
		print(request.data)
		contact_toedit = Contacts.objects.get(id=id)
		if contact_toedit:
			try:
				serializer = ContactsSerializer(contact_toedit,data=request.data,partial=True)
				if serializer.is_valid():
					serializer.save()	
			except Exception as e:
				return Response({'status': status.HTTP_400_BAD_REQUEST, 'data': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def delete_contact(request,id):
	try:
		contact_to_delete = Contacts.objects.get(id=id)
		if contact_to_delete:
			contact_to_delete.delete()
			return Response({'status':status.HTTP_200_OK,'delete_status':True,},status=status.HTTP_200_OK)
		else:
			return Response({'status':status.HTTP_200_OK,'delete_status':False, 'message':'invalid id'},status=status.HTTP_200_OK)
	except Exception as e:
		return Response({'status': status.HTTP_400_BAD_REQUEST,'delete_status':False, 'data': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_username(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
        
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		if request.user.is_authenticated:
			print('yess')
			serializer = UserSerializer(request.user)
			return Response({'user': serializer.data,'status':True}, status=status.HTTP_200_OK)
		else:
			print('nooo')
			return Response({'status': False, 'message': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)