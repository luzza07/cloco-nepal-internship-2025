from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import *
from .emails import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate




class LoginAPI(APIView):
    
    def post(self,request):
        try:
            data = request.data
            serializer = LoginSerializer(data=data)
            if serializer.is_valid():
                email = serializer.data['email']
                password = serializer.data['password']
                user = authenticate(email=email,password=password)
                if user is None:
                    return Response({
                        'status':400,
                        'message':'invalid credentials',
                        'data':{}
                    })
                
                if user.is_verified is False:
                    return Response({
                        'status':400,
                        'message':'Account is not verified',
                        'data':{}
                    })
                
                
                
                refresh = RefreshToken.for_user(user)
                
                return Response({
                    'refresh':str(refresh),
                    'access':str(refresh.access_token),
                },status=200)
            
            return Response({
                'status':400,
                'message':'something went wrong',
                'data':serializer.errors,
            })
            
        
        except Exception as e:
            print(e)
            


