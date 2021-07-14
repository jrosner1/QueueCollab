import firebase_admin
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from firebase_admin import credentials, initialize_app, db
from resources.User import User

app = Flask(__name__)
#CORS(app, support_credentials=True)
api = Api(app)

app.config['CORS_HEADERS'] = 'Content-Type'

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

# Initialize Firestore DB
if not firebase_admin._apps:
    cred_obj = credentials.Certificate('cred.json')
    default_app = initialize_app(cred_obj, {
	    'databaseURL':'https://spotifyparty-a6660-default-rtdb.firebaseio.com/'
	    })
db = db.reference("/")




api.add_resource(User, '/User')


if __name__ == '__main__':
    app.run(debug=True)

