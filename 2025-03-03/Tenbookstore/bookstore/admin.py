from django.contrib import admin
from .models import *

admin.site.register(Author)
admin.site.register(Category)
admin.site.register(Publisher)
admin.site.register(Book)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Review)
admin.site.register(Payment)
admin.site.register(Cart)
