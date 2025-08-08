from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from pymongo import MongoClient
load_dotenv()

MONGO_URI = os.getenv('MONGO_URI')

client = MongoClient(MONGO_URI)
db = client.adarsh

collection = db['form_database']

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit():
    form_data = dict(request.form)
    
    # Insert the data and get the result
    result = collection.insert_one(form_data)
    
    # Convert ObjectId to string for JSON serialization
    form_data['_id'] = str(result.inserted_id)
    
    return jsonify(form_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000, debug=True)