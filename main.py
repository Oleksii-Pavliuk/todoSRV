# This file contains all the code used in the codelab. 
import sqlalchemy
import json



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



#############################
# 
#       USER FUNCTIONS
#
##############################
  

# Get users 
def getUsers(request):

    stmt = sqlalchemy.text('SELECT * FROM users')
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
          rows = result.fetchall()
          return json.dumps({"data": [dict(row) for row in rows]}), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        error_msg = "An error occurred while retrieving data: {}".format(str(e))
        return json.dumps({"error": error_msg}), 500, {'Content-Type': 'application/json'}


# Add user
def addUser(request):
  # Get request params
    params = request.get_json()
    username = params['username']
    password = params['password']

    # Execute query
    stmt = sqlalchemy.text('insert into users (username, password) values (:username, :password)')
    stmt = stmt.bindparams(username=username, password=password)
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e))
    return 'ok', 200


# Delete user
def deleteUser(request):
  # Get request params
    params = request.get_json()
    username = params['username']

    # Execute query
    stmt = sqlalchemy.text('DELETE FROM users WHERE username = :username')
    stmt = stmt.bindparams(username=username)
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e))
    return 'ok', 200

##############################
# 
#       TASKS FUNCTIONS
#
##############################

# Get tasks 
def getTask(request):

    params = request.get_json()
    user = params['user']

    stmt = sqlalchemy.text('SELECT * FROM tasks WHERE user = :user')
    stmt = stmt.bindparams( user=user )
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
          rows = result.fetchall()
          return json.dumps({"data": [dict(row) for row in rows]}), 200, {'Content-Type': 'application/json'}
    except Exception as e:
        error_msg = "An error occurred while retrieving data: {}".format(str(e))
        return json.dumps({"error": error_msg}), 500, {'Content-Type': 'application/json'}


# Add task
def addTask(request):
  # Get request params
    params = request.get_json()
    name = params['name']
    description = params['description']
    id = params['id']

    # Execute query
    stmt = sqlalchemy.text('insert into tasks (name, description, user_id ) values (:name, :description, :id)')
    stmt = stmt.bindparams(name=name , description = description, id = id)
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e))
    return 'ok', 200



#Edit task
def editTask(request):
  # Get request params
    params = request.get_json()
    id = params['id']
    name = params['name']
    description = params['description']

    # Execute query
    if(not description and name):
      stmt = sqlalchemy.text('UPDATE tasks SET name = :name WHERE id = :id;')
      stmt = stmt.bindparams(name=name, id=id)
    if(not name and description):
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
        return 'Error: {}'.format(str(e))
    return 'ok', 200



#Change task
def changeTask(request):
  # Get request params
    params = request.get_json()
    id = params['id']

    # Execute query
    stmt = sqlalchemy.text('UPDATE tasks SET done = True WHERE id = :id;')
    stmt = stmt.bindparams(id=id)
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e))
    return 'ok', 200



#Delete task
def deleteTask(request):
  # Get request params
    params = request.get_json()
    id = params['id']

    # Execute query
    stmt = sqlalchemy.text('DELETE FROM tasks WHERE id = :id;')
    stmt = stmt.bindparams(id=id)
    
    db = getDB()
    try:
        # Exequte query and send responce
        with db.connect() as conn:
          result = conn.execute(stmt)
    except Exception as e:
        return 'Error: {}'.format(str(e))
    return 'ok', 200