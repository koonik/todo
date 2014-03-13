from rest_framework import generics, permissions


from .serializers import TaskSerializer
from .models import Task


class TaskList(generics.ListCreateAPIView):
    model = Task
    serializer_class = TaskSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Task
    serializer_class = TaskSerializer
    permission_classes = [
        permissions.AllowAny
    ]

