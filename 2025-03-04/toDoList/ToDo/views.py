from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .serializers import ToDoSerializer, StudentSerializer
from .models import ToDo, Student
from .forms import ToDoForm


# ===========================
# 🌍 HTML Template Views
# ===========================

# 📝 Signup View
def signup(request):
    if request.user.is_authenticated:
        return redirect("todo_list")  # Redirect if already logged in

    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("todo_list")  # Redirect to To-Do list after signup
    else:
        form = UserCreationForm()
    
    return render(request, "registration/signup.html", {"form": form})


# 🔑 Login View
def user_login(request):
    if request.user.is_authenticated:
        return redirect("todo_list")  # Redirect if already logged in

    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("todo_list")  # Redirect after login
    else:
        form = AuthenticationForm()
    
    return render(request, "registration/login.html", {"form": form})


# 🚪 Logout View
def user_logout(request):
    logout(request)
    return redirect("login")


# ===========================
# ✅ To-Do Views (HTML)
# ===========================

# 📌 List To-Dos
@login_required(login_url="/login/")
def todo_list(request):
    todos = ToDo.objects.all()
    return render(request, "ToDo/todo_list.html", {"todos": todos})



@login_required(login_url="login")
def todo_detail(request, pk):
    todo = get_object_or_404(ToDo, pk=pk)
    return render(request, "ToDo/todo_detail.html", {"todo": todo})



@login_required(login_url="login")
def todo_create(request):
    if request.method == "POST":
        form = ToDoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("todo_list")
    else:
        form = ToDoForm()
    
    return render(request, "ToDo/todo_form.html", {"form": form})



@login_required(login_url="login")
def todo_update(request, pk):
    todo = get_object_or_404(ToDo, pk=pk)
    if request.method == "POST":
        form = ToDoForm(request.POST, instance=todo)
        if form.is_valid():
            form.save()
            return redirect("todo_list")
    else:
        form = ToDoForm(instance=todo)
    
    return render(request, "ToDo/todo_form.html", {"form": form})


@login_required(login_url="login")
def todo_delete(request, pk):
    todo = get_object_or_404(ToDo, pk=pk)
    if request.method == "POST":
        todo.delete()
        return redirect("todo_list")
    
    return render(request, "ToDo/todo_confirm_delete.html", {"todo": todo})


# ===========================
# 🔄 API Views (DRF)
# ===========================


class ListTodo(generics.ListAPIView):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


class DetailTodo(generics.RetrieveAPIView):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]



class CreateTodo(generics.CreateAPIView):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]



class UpdateTodo(generics.UpdateAPIView):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]



class DeleteTodo(generics.DestroyAPIView):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]



class StudentApi(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response({
            "status": True,
            "data": serializer.data
        })
        

