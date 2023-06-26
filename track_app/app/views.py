def check_table_existence():
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()

    # Check if the table exists
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='your_table_name'")
    table_exists = cursor.fetchone() is not None

    conn.close()

    return table_exists

# def get_table_data():
#     conn = sqlite3.connect('db.sqlite3')
#     cursor = conn.cursor()

#     # Assuming the table name is 'your_table_name'
#     cursor.execute("SELECT * FROM your_table_name")
#     table_data = cursor.fetchall()

#     conn.close()

#     return table_data

from django.shortcuts import render
from django.http import HttpResponse
import sqlite3

def index(request):
    table_data = None

    if request.method == 'POST':
        table_name = request.POST['table_name']
        create_table(table_name)

    if request.method == 'GET':
        # Print the table and its values if it exists
        if check_table_existence():
            table_data = get_table_data()
            print(table_data)
        else:
            print("Table does not exist.")
    
    context = {
        'table_data': table_data
    }

    return render(request, 'index.html', context)

def create_table(table_name):
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()
    
    # Create the table
    cursor.execute(f"CREATE TABLE IF NOT EXISTS {table_name} (id INTEGER PRIMARY KEY, name TEXT)")
    
    conn.commit()
    conn.close()

# The create_table() and check_table_existence() functions remain the same

def get_table_data():
    conn = sqlite3.connect('db.sqlite3')
    cursor = conn.cursor()

    # Assuming the table name is 'your_table_name'
    cursor.execute("SELECT * FROM your_table_name")
    table_data = cursor.fetchall()

    conn.close()

    return table_data
