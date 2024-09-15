from rest_framework import viewsets
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.filters import OrderingFilter, SearchFilter

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name', 'email', 'mobile', 'date_of_birth']
    ordering_fields = ['name', 'email', 'mobile', 'date_of_birth']
