from flask import Flask, request
from flask_cors import CORS
import pymongo
from bson import json_util
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
db = myclient["expertise"]
col = db["user"]
col.drop()
#testrow = {"name": "Nimi1", "html": 1, "css": 2}
#testrow2 = {"name": "Nimi2", "html": 3, "css": 4}
testrow = {
    "name": "Mikko",
    "skills": [
      {
        "skill": "HTML",
        "grade": 0
      },
      {
        "skill": "CSS",
        "grade": 1
      },
      {
        "skill": "JS",
        "grade": 2
      },
      {
        "skill": "REACT",
        "grade": 3
      },
      {
        "skill": "PYTHON",
        "grade": 4
      },
      {
        "skill": "SQL",
        "grade": 5
      }
    ]
  }
testrow2 = {
    "name": "Zabi",
    "skills": [
      {
        "skill": "HTML",
        "grade": 5
      },
      {
        "skill": "CSS",
        "grade": 4
      },
      {
        "skill": "JS",
        "grade": 3
      },
      {
        "skill": "REACT",
        "grade": 2
      },
      {
        "skill": "PYTHON",
        "grade": 1
      },
      {
        "skill": "SQL",
        "grade": 0
      }
    ]
  }
testrow3 = {
    "name": "Juhis",
    "skills": [
      {
        "skill": "HTML",
        "grade": 3
      },
      {
        "skill": "CSS",
        "grade": 4
      },
      {
        "skill": "JS",
        "grade": 5
      },
      {
        "skill": "REACT",
        "grade": 0
      },
      {
        "skill": "PYTHON",
        "grade": 1
      },
      {
        "skill": "SQL",
        "grade": 2
      }
    ]
  }
x = col.insert_one(testrow)
x2 = col.insert_one(testrow2)
x3 = col.insert_one(testrow3)

print(x.inserted_id)
print(x2.inserted_id)
print(x3.inserted_id)

@app.route('/user', methods=['GET'])
def get_users():
    users = []
    for user in col.find():
        users.append(user)
    print(users)
    return json_util.dumps(users)

@app.route('/user/<string:id>', methods=['GET'])
def get_user(id):
    user = col.find_one({'_id': ObjectId(id)})
    return json_util.dumps(user)

@app.route('/user', methods=['POST'])
def create_user():
    user = request.json
    print(user)
    new = col.insert_one(user)
    print(new)
    return json_util.dumps(col.find_one({'_id': ObjectId(new.inserted_id)}))

@app.route('/user/<string:id>', methods=['POST'])
def update_user(id):
    user = col.find_one({'_id': ObjectId(id)})
    usernew = request.json
    print(user)
    new = col.update_one(user, usernew)
    print(new)
    cr = col.find_one({'_id': ObjectId(id)})
    return json_util.dumps(cr)

@app.route('/user/<string:id>', methods=['DELETE'])
def delete_user(id):
    delete_result = col.delete_one({'_id': ObjectId(id)})
    if delete_result.deleted_count == 1:
        return "Deleted " + id + " from database";

@app.route('/')
def index():
    return '<h1>Osaamiskartoitus API</h1>'

app.run(host='0.0.0.0', port=8000, debug=False)
