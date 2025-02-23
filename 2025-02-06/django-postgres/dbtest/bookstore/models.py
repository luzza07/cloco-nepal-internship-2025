from django.db import models

class Author(models.Model):
    name=models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
class Publisher(models.Model):
    name=models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
class BookCategory(models.Model):
    name=models.CharField(max_length=255, unique=True)
    
    def __str__(self):
        return self.name
    
class Book(models.Model):
    title=models.CharField(max_length=255)
    author=models.ForeignKey(Author, on_delete=models.SET_NULL,null=True,blank=True)
    publisher=models.ForeignKey(Publisher, on_delete=models.SET_NULL,null=True,blank=True)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    details=models.TextField(blank=True)
    categories=models.ManyToManyField(BookCategory, through='BookCategoryMap')
    
    def __str__(self):
        return self.title
    
class BookCategoryMap(models.Model):
    book=models.ForeignKey(Book, on_delete=models.CASCADE)
    category=models.ForeignKey(BookCategory, on_delete=models.CASCADE)
    
    class Meta:
        unique_together=('book','category')
        
class Inventory(models.Model):
    book=models.OneToOneField(Book, on_delete=models.CASCADE)
    stock_quantity=models.IntegerField()
    
    def __str__(self):
        return f"{self.book.title} - {self.stock_quantity}"
    
class Customer(models.Model):
    name=models.CharField(max_length=255)
    email=models.EmailField(unique=True)
    address=models.TextField()
    contact=models.CharField(max_length=15)
    password=models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
class Order(models.Model):
    STATUS_CHOICES=[
        ('Pending','Pending'),
        ('Shipped','Shipped'),
        ('Delivered','Delivered'),      
    ]
    
    customer =models.ForeignKey(Customer,on_delete=models.CASCADE)
    order_date=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.id} - {self.customer.name}"
    
class OrderDetail(models.Model):
    order=models.ForeignKey(Order, on_delete=models.CASCADE)
    book=models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField()
    price=models.DecimalField(max_digits=10,decimal_places=2)
    order_status = models.CharField(max_length=20,choices=Order.STATUS_CHOICES, default='Pending')
    
    def __str__(self):
        return f"Order {self.order.id} - {self.book.title}"
    
class Payment(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    payment_methods=models.CharField(max_length=50)
    
    def __str__(self):
        return f"Payment for order {self.order.id}"
    
class Cart(models.Model):
    customer =models.ForeignKey(Customer,on_delete=models.CASCADE)
    book=models.ForeignKey(Book,on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.customer.name} -{self.book.title}"