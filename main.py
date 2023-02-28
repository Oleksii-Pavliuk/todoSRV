# This file contains all the code used in the codelab. 
import sqlalchemy
import json
from datetime import date, datetime
import functions_framework

import six
from google.cloud import translate_v2 as translate


# Get Database connection
def getDB():
  connection_name='optimal-life-378201:australia-southeast1:todo-database'
  db_name='todo'
  db_user='postgres'
  db_password ='*E5y]~{=ge@d{^,g'
  driver_name = 'postgresql+pg8000'
  query_string =  dict({"unix_sock": "/cloudsql/{}/.s.PGSQL.5432".format(connection_name)})
  return sqlalchemy.create_engine(
          sqlalchemy.engine.url.URL(
            drivername=driver_name,
            username=db_user,
            password=db_password,
            database=db_name,
            query=query_string,
          ),
          pool_size=5,
          max_overflow=2,
          pool_timeout=30,
          pool_recycle=1800
        )


#serialising dattime format 
def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))






#############################
# 
#       USER FUNCTIONS
#
##############################
  

# Get users V
def getUsers(request):



    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        print('OPTIONS SENT')
        return ('', 204, headers)


    headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com'
    }
    stmt = sqlalchemy.text('SELECT * FROM users')
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
          rows = result.fetchall()
          return json.dumps([dict(row) for row in rows]), 200, headers
    except Exception as e:
        error_msg = "An error occurred while retrieving data: {}".format(str(e))
        return json.dumps({"error": error_msg}), 500,headers




# Add user V
def addUser(request):

    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        print('OPTIONS SENT')
        return ('', 204, headers)
    print("GETTING PARAMS")
    content_type = request.headers['content-type']

    if content_type == 'application/json':
        request_json = request.get_json(silent=True)
        if request_json :
              username = request_json['username']
              password = request_json['password']
        else:
            raise ValueError("JSON is invalid, or missing property")

    headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com'
    }

    # Execute query
    stmt = sqlalchemy.text('insert into users (username, password) values (:username, :password)')
    stmt = stmt.bindparams(username=username, password=password)
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e)),500,headers
        

    stmt = sqlalchemy.text('SELECT * FROM users WHERE username = :username')
    stmt = stmt.bindparams(username=username)
    db = getDB()
    try:
        # Execute query and send response
        with db.connect() as conn:
            result = conn.execute(stmt)
            rows = result.fetchall()
            print("Data extracted, sending")
            response = json.dumps({"data": [dict(row) for row in rows]}, default=json_serial)
        return(response,200,headers)
    except Exception as e:
        error_msg = "An error occurred while retrieving data: {}".format(str(e))
        response = json.dumps({"error": error_msg})
        return (response, 500, headers)

    


# Check user
def checkUser(request):
    

    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        print('OPTIONS SENT')
        return ('', 204, headers)
    print("GETTING PARAMS")
    content_type = request.headers['content-type']

    if content_type == 'application/json':
        request_json = request.get_json(silent=True)
        if request_json :
              username = request_json['username']
              password = request_json['password']
        else:
            raise ValueError("JSON is invalid, or missing property")

    headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com'
    }

    # Execute query
    stmt = sqlalchemy.text('SELECT * FROM users WHERE username = :username')
    stmt = stmt.bindparams(username=username)
    db = getDB()
    try:
        # Execute query and send response
        with db.connect() as conn:
            result = conn.execute(stmt)
            rows = result.fetchall()
            print("Data extracted, sending")
            response = json.dumps({"data": [dict(row) for row in rows]}, default=json_serial)
        return(response,200,headers)
    except Exception as e:
        error_msg = "An error occurred while retrieving data: {}".format(str(e))
        response = json.dumps({"error": error_msg})
        return (response, 500, headers)


# Delete user V
def deleteUser(request):
    

    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        print('OPTIONS SENT')
        return ('', 204, headers)
    print("GETTING PARAMS")
    content_type = request.headers['content-type']

    if content_type == 'application/json':
        request_json = request.get_json(silent=True)
        if request_json and 'username' in request_json:
          id = request_json['username']
        else:
            raise ValueError("JSON is invalid, or missing property")

    headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com'
    }

    # Execute query
    stmt = sqlalchemy.text('DELETE FROM users WHERE username = :id')
    stmt = stmt.bindparams(id=id)
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e)),500
    return 'ok', 200,headers


##############################
# 
#       TASKS FUNCTIONS
#
##############################

# Get tasks V
@functions_framework.http
def getTasks(request):


    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        print('OPTIONS SENT')
        return ('', 204, headers)
    
    print("GETTING PARAMS")
    content_type = request.headers['content-type']

    if content_type == 'application/json':
        print("content json")
        request_json = request.get_json(silent=True)
        if request_json and 'username' in request_json:
            username = request_json['username']
        else:
            raise ValueError("JSON is invalid, or missing a 'user_id' property")
    print(str(username) + " extracted ")

    headers = {
        'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600'
    }

    stmt = sqlalchemy.text('SELECT * FROM tasks WHERE username = :username')
    stmt = stmt.bindparams(username=username)
    db = getDB()

    try:
        # Execute query and send response
        with db.connect() as conn:
            result = conn.execute(stmt)
            rows = result.fetchall()
            print("Data extracted, sending")
            response = json.dumps({"data": [dict(row) for row in rows]}, default=json_serial)
        return(response,200,headers)
    except Exception as e:
        error_msg = "An error occurred while retrieving data: {}".format(str(e))
        response = json.dumps({"error": error_msg})
        return (response, 500, headers)




# Add task V
def addTask(request):
    
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        print('OPTIONS SENT')
        return ('', 204, headers)
    print("GETTING PARAMS")
    content_type = request.headers['content-type']

    if content_type == 'application/json':
        request_json = request.get_json(silent=True)
        if request_json and 'username' in request_json:
          name = request_json['name']
          description = request_json['description']
          username = request_json['username']
        else:
            raise ValueError("JSON is invalid, or missing property")

    headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com'
    }

    # Execute query
    stmt = sqlalchemy.text('insert into tasks (name, description, username ) values (:name, :description, :username)')
    stmt = stmt.bindparams(name=name , description = description, username = username)
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e)),500
    return 'ok', 200,headers



#Edit task V
def editTask(request):
  # Get request params
    

    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        print('OPTIONS SENT')
        return ('', 204, headers)
    print("GETTING PARAMS")
    content_type = request.headers['content-type']

    if content_type == 'application/json':
        request_json = request.get_json(silent=True)
        if request_json:
          name = request_json['name']
          description = request_json['description']
          id = request_json['id']
        else:
            raise ValueError("JSON is invalid, or missing property")

    headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com'
    }

    # Execute query
    if( not id and not name and  not description):
      return 'Wrong request'
    elif (not description and name):
      stmt = sqlalchemy.text('UPDATE tasks SET name = :name WHERE id = :id;')
      stmt = stmt.bindparams(name=name, id=id)
    elif(not name and description):
      stmt = sqlalchemy.text('UPDATE tasks SET description = :description WHERE id = :id;')
      stmt = stmt.bindparams(description = description, id=id)
    else:
      stmt = sqlalchemy.text('UPDATE tasks SET name = :name, description = :description WHERE id = :id;')
      stmt = stmt.bindparams(name=name , description = description, id=id)
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e)),500
    return 'ok', 200,headers




#Change task( make it done)  V
def changeTask(request):

    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        print('OPTIONS SENT')
        return ('', 204, headers)
    print("GETTING PARAMS")
    content_type = request.headers['content-type']

    if content_type == 'application/json':
        request_json = request.get_json(silent=True)
        if request_json and 'id' in request_json:
          id = request_json['id']
        else:
            raise ValueError("JSON is invalid, or missing property")

    headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com'
    }

    # Execute query
    stmt = sqlalchemy.text('UPDATE tasks SET done = true, done_date = CURRENT_TIMESTAMP WHERE id = :id;')
    stmt = stmt.bindparams(id=id)
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e)),500
    return 'ok', 200,headers



#Translate task(log translation)  V
def translateTask(request):

    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        print('OPTIONS SENT')
        return ('', 204, headers)
    
    print("GETTING PARAMS")
    content_type = request.headers['content-type']

    if content_type == 'application/json':
        request_json = request.get_json(silent=True)
        if request_json and 'id' in request_json:
          id = request_json['id']
          name = request_json['name']
          text = request_json['text']
        else:
            raise ValueError("JSON is invalid, or missing property")

    headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com'
    }

    #Translates text into the target language.

    translate_client = translate.Client()


    if isinstance(text, six.binary_type):
        text = text.decode("utf-8")

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.translate(text, target_language='UK')
    result_name = translate_client.translate(name, target_language='UK')

    responce = {
        'name' : result_name["translatedText"],
        'text' : result["translatedText"]
    }




    # Execute query
    stmt = sqlalchemy.text('UPDATE tasks SET translated = true, translated_date = CURRENT_TIMESTAMP WHERE id = :id;')
    stmt = stmt.bindparams(id=id)
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e)),500,headers
    return json.dumps(responce), 200,headers



#Delete task V 
def deleteTask(request):
  

    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        print('OPTIONS SENT')
        return ('', 204, headers)
    print("GETTING PARAMS")
    content_type = request.headers['content-type']

    if content_type == 'application/json':
        request_json = request.get_json(silent=True)
        if request_json and 'id' in request_json:
          id = request_json['id']
        else:
            raise ValueError("JSON is invalid, or missing property")

    headers = {
            'Access-Control-Allow-Origin': 'https://optimal-life-378201.ts.r.appspot.com'
    }
    # Execute query
    stmt = sqlalchemy.text('UPDATE tasks SET deleted=true WHERE id = :id;')
    stmt = stmt.bindparams(id=id)
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e)),500
    return 'ok', 200,headers


