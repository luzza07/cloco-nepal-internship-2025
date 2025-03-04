from django.urls import path
from django.contrib.auth.decorators import login_required
from rest_framework.authtoken.views import obtain_auth_token
from .views import (
    signup, user_login, user_logout,
    todo_list, todo_detail, todo_create, todo_update, todo_delete,
    ListTodo, DetailTodo, CreateTodo, UpdateTodo, DeleteTodo
)

urlpatterns = [
    # ===========================
    # 🌍 HTML Views (Django templates)
    # ===========================
    path("signup/", signup, name="signup"),
    path("login/", user_login, name="login"),
    path("logout/", user_logout, name="logout"),

    # Redirect to login if user is not authenticated
    path("", login_required(todo_list, login_url="/login/"), name="todo_list"),
    path("<int:pk>/", login_required(todo_detail, login_url="/login/"), name="todo_detail"),
    path("create/", login_required(todo_create, login_url="/login/"), name="todo_create"),
    path("update/<int:pk>/", login_required(todo_update, login_url="/login/"), name="todo_update"),
    path("delete/<int:pk>/", login_required(todo_delete, login_url="/login/"), name="todo_delete"),

    # ===========================
    # 🔄 API Views (Token Authentication Required)
    # ===========================
    path("api/todos/", ListTodo.as_view(), name="todo_api_list"),
    path("api/todos/<int:pk>/", DetailTodo.as_view(), name="todo_api_detail"),
    path("api/todos/create/", CreateTodo.as_view(), name="todo_api_create"),
    path("api/todos/update/<int:pk>/", UpdateTodo.as_view(), name="todo_api_update"),
    path("api/todos/delete/<int:pk>/", DeleteTodo.as_view(), name="todo_api_delete"),

    # ===========================
    # 🔑 Authentication Endpoints (API)
    # ===========================
    path("api/token/", obtain_auth_token, name="api_token_auth"),
]
