from django.shortcuts import render, redirect
from django.http import HttpResponse

def index(request):

    count = request.session.get('count', 0)  # Get the current count from session, default to 0

    if request.method == 'POST':
        count += 1  # Increment the count when the form is submitted

        request.session['count'] = count  # Update the count in session
        return redirect('index')  # Redirect to GET request after successful POST
    else:
        count = request.session.get('count', 0)  # Get the current count from session, default to 0
    return render(request, 'index.html', {'count': count})