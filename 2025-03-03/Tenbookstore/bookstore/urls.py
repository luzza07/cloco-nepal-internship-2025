from django.urls import path
from .views import *

urlpatterns = [
    path('authors/', AuthorListView.as_view(), name='author-list'),
    path('authors/<int:pk>/', AuthorDetailView.as_view(), name='author-detail'),

    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),

    path('publishers/', PublisherListView.as_view(), name='publisher-list'),
    path('publishers/<int:pk>/', PublisherDetailView.as_view(), name='publisher-detail'),

    path('books/', BookListView.as_view(), name='book-list'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book-detail'),

    path('customers/', CustomerListView.as_view(), name='customer-list'),
    path('customers/<str:username>/', CustomerDetailView.as_view(), name='customer-detail'),

    path('orders/', OrderListView.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),

    path('order-items/', OrderItemListView.as_view(), name='order-item-list'),
    path('order-items/<int:pk>/', OrderItemDetailView.as_view(), name='order-item-detail'),

    path('reviews/', ReviewListView.as_view(), name='review-list'),
    path('reviews/<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),

    path('payments/', PaymentListView.as_view(), name='payment-list'),
    path('payments/<int:pk>/', PaymentDetailView.as_view(), name='payment-detail'),

    path('cart/', CartListView.as_view(), name='cart-list'),
    path('cart/<int:pk>/', CartDetailView.as_view(), name='cart-detail'),
]
