from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # API endpoints
    path('api/incomes/', views.income_list, name='income-list'),
    path('api/incomes/<int:pk>/', views.income_delete, name='income-delete'),
    path('api/expenses/', views.expense_list, name='expense-list'),
    path('api/expenses/<int:pk>/', views.expense_delete, name='expense-delete'),

    # Catch-all for Angular frontend
    path('', views.index, name='index'),
]
