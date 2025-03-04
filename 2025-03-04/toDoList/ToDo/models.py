from django.db import models
from django.contrib.auth.models import User

class ToDo(models.Model):
    title = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=True)
    date = models.DateField(blank=True, null=True)  
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title 
    
class Student(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name
