import firebase_admin
from flask import Flask
from firebase_admin import credentials, initialize_app, db
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"], supports_credentials = True)

app.config['SECRET_KEY'] = 'ChangeMEEEE'
'''
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, x-auth")
    return response
'''
from resources.User import *
from resources.Spotify import *
# Initialize Firestore DB
if not firebase_admin._apps:
    cred_obj = credentials.Certificate('cred.json')
    default_app = initialize_app(cred_obj, {
	    'databaseURL':'https://spotifyparty-a6660-default-rtdb.firebaseio.com/'
	    })
db = db.reference("/")


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
    


