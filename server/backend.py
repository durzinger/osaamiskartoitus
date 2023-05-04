from flask import Flask, request
import pymongo
from bson import json_util
from bson.objectid import ObjectId

app = Flask(__name__)

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
db = myclient["expertise"]
col = db["user"]
col.drop()
testrow = {"name": "Nimi1", "html": 1, "css": 2}
testrow2 = {"name": "Nimi2", "html": 3, "css": 4}
x = col.insert_one(testrow)
x2 = col.insert_one(testrow2)

print(x.inserted_id)
print(x2.inserted_id)

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

