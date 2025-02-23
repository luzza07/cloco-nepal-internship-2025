from django.contrib import admin
from .models import *

admin.site.register(Author)
admin.site.register(Publisher)
admin.site.register(Book)
admin.site.register(BookCategory)
admin.site.register(BookCategoryMap)
admin.site.register(Inventory)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(OrderDetail)
admin.site.register(Payment)
admin.site.register(Cart)
