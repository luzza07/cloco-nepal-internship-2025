from django.db import models
from django.contrib.auth.models import User

class Author(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.name 

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name 

class Publisher(models.Model):
    name = models.CharField(max_length=255)
    website = models.URLField()

    def __str__(self):
        return self.name 

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    publisher = models.ForeignKey(Publisher, on_delete=models.SET_NULL, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    published_date = models.DateField()

    def __str__(self):
        return self.title  



class Customer(models.Model):
    username = models.CharField(max_length=150, unique=True,null=True,blank=True)
    phone = models.CharField(max_length=20)
    address = models.TextField()

    def __str__(self):
        return self.username


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Completed', 'Completed')], default='Pending')

    def __str__(self):
        return f"Order {self.id} - {self.customer.username}"  

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.book.title} (Order {self.order.id})"  

class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()

    def __str__(self):
        return f"Review by {self.customer.username} - {self.rating}⭐ on {self.book.title}"  

class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Completed', 'Completed')], default='Pending')

    def __str__(self):
        return f"Payment for Order {self.order.id} - {self.status}"  

class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.customer.username}'s Cart - {self.quantity} x {self.book.title}"  
