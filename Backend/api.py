import firebase_admin
from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource
from firebase_admin import credentials, initialize_app, db
from resources.User import User

# Helpful query guide for firebase https://firebase.google.com/docs/database/admin/retrieve-data#python_3

app = Flask(__name__)
CORS(app, support_credentials=True)
api = Api(app)
#CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

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

