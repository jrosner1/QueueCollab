import firebase_admin
import os
from flask import Flask, session
from flask_session import Session
from flask_restful import Api
from firebase_admin import credentials, initialize_app, db
from resources.Spotify import Spotify
from resources.User import User 


app = Flask(__name__)

app.config['SECRET_KEY'] = os.urandom(64)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './/flask_session/'
Session(app)
api = Api(app)



#Don't think that I will need this setting, 
# but I will keep it commented just in case the following cors method needs this for some reason.
#app.config['CORS_HEADERS'] = 'Content-Type'

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








api.add_resource(User, '/User/')
api.add_resource(Spotify, '/Spotify/')


if __name__ == '__main__':
    app.run(debug=True)

