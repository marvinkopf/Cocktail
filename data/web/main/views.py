from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request, resource):
    return render(request, 'react-app/build/index.html')
