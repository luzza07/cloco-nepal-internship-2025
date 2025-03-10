from rest_framework import serializers
from .models import *


class AuthorSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    bio = serializers.CharField(allow_blank=True, required=False)

    def create(self, validated_data):
        return Author.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()
        return instance

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class PublisherSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    website = serializers.URLField()

    def create(self, validated_data):
        return Publisher.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.website = validated_data.get('website', instance.website)
        instance.save()
        return instance

class BookSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    
    
    author = serializers.CharField(source='author.name', read_only=True)
    category = serializers.CharField(source='category.name', read_only=True, allow_null=True)
    publisher = serializers.CharField(source='publisher.name', read_only=True, allow_null=True)

    
    author_id = serializers.IntegerField(write_only=True)
    category_id = serializers.IntegerField(write_only=True, allow_null=True)
    publisher_id = serializers.IntegerField(write_only=True, allow_null=True)

    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    stock = serializers.IntegerField()
    published_date = serializers.DateField()

    def create(self, validated_data):
        validated_data['author'] = Author.objects.get(id=validated_data.pop('author_id'))
        validated_data['category'] = Category.objects.get(id=validated_data.pop('category_id')) if validated_data.get('category_id') else None
        validated_data['publisher'] = Publisher.objects.get(id=validated_data.pop('publisher_id')) if validated_data.get('publisher_id') else None
        return Book.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        if 'author_id' in validated_data:
            instance.author = Author.objects.get(id=validated_data['author_id'])
        if 'category_id' in validated_data:
            instance.category = Category.objects.get(id=validated_data['category_id']) if validated_data['category_id'] else None
        if 'publisher_id' in validated_data:
            instance.publisher = Publisher.objects.get(id=validated_data['publisher_id']) if validated_data['publisher_id'] else None
        instance.price = validated_data.get('price', instance.price)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.published_date = validated_data.get('published_date', instance.published_date)
        instance.save()
        return instance

class CustomerSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=20)
    address = serializers.CharField()

    def create(self, validated_data):
        return Customer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.address = validated_data.get('address', instance.address)
        instance.save()
        return instance

class OrderSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    customer = serializers.CharField(source='customer.user.username', read_only=True)
    customer_id = serializers.IntegerField(write_only=True)
    order_date = serializers.DateTimeField(read_only=True)
    status = serializers.ChoiceField(choices=[('Pending', 'Pending'), ('Completed', 'Completed')])

    def create(self, validated_data):
        validated_data['customer'] = Customer.objects.get(id=validated_data.pop('customer_id'))
        return Order.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if 'customer_id' in validated_data:
            instance.customer = Customer.objects.get(id=validated_data['customer_id'])
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

class OrderItemSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    order = serializers.CharField(source='order.id', read_only=True)
    book = serializers.CharField(source='book.title', read_only=True)
    
    order_id = serializers.IntegerField(write_only=True)
    book_id = serializers.IntegerField(write_only=True)
    quantity = serializers.IntegerField()

    def create(self, validated_data):
        validated_data['order'] = Order.objects.get(id=validated_data.pop('order_id'))
        validated_data['book'] = Book.objects.get(id=validated_data.pop('book_id'))
        return OrderItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if 'order_id' in validated_data:
            instance.order = Order.objects.get(id=validated_data['order_id'])
        if 'book_id' in validated_data:
            instance.book = Book.objects.get(id=validated_data['book_id'])
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance

class ReviewSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    book = serializers.CharField(source='book.title', read_only=True)
    customer = serializers.CharField(source='customer.user.username', read_only=True)
    
    book_id = serializers.IntegerField(write_only=True)
    customer_id = serializers.IntegerField(write_only=True)
    rating = serializers.ChoiceField(choices=[(i, i) for i in range(1, 6)])
    comment = serializers.CharField()

    def create(self, validated_data):
        validated_data['book'] = Book.objects.get(id=validated_data.pop('book_id'))
        validated_data['customer'] = Customer.objects.get(id=validated_data.pop('customer_id'))
        return Review.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if 'book_id' in validated_data:
            instance.book = Book.objects.get(id=validated_data['book_id'])
        if 'customer_id' in validated_data:
            instance.customer = Customer.objects.get(id=validated_data['customer_id'])
        instance.rating = validated_data.get('rating', instance.rating)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance

class PaymentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    order = serializers.CharField(source='order.id', read_only=True)
    
    order_id = serializers.IntegerField(write_only=True)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    payment_date = serializers.DateTimeField(read_only=True)
    status = serializers.ChoiceField(choices=[('Pending', 'Pending'), ('Completed', 'Completed')])

    def create(self, validated_data):
        validated_data['order'] = Order.objects.get(id=validated_data.pop('order_id'))
        return Payment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if 'order_id' in validated_data:
            instance.order = Order.objects.get(id=validated_data['order_id'])
        instance.amount = validated_data.get('amount', instance.amount)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance


class CartSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    quantity = serializers.IntegerField()

    def create(self, validated_data):
        return Cart.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.customer = validated_data.get('customer', instance.customer)
        instance.book = validated_data.get('book', instance.book)
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance
