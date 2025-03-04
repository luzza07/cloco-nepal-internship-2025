from rest_framework import serializers
from .models import ToDo, Student

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model=ToDo
        fields='__all__'
        
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student
        fields='__all__'
        