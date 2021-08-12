
from flask import session, request, redirect, jsonify
import random as rand
import string
from common.spotify_util import getUserInformation, getToken

from api import app
import os
import uuid
import urllib
import time

SCOPE = "user-read-private"

'''
#Cache logic follows in order to create sessions for spotify
caches_folder = '../.spotify_caches/'
if not os.path.exists(caches_folder):
    #Ensure cache folder exists
    os.makedirs(caches_folder)

def session_cache_path():
    return caches_folder + session.get('uuid')

'''
AUTHORIZE_URL = 'https://accounts.spotify.com/authorize?'
def create_state_key(size):
	#https://stackoverflow.com/questions/2257441/random-string-generation-with-upper-case-letters-and-digits
	return ''.join(rand.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(size))



@app.route('/Spotify/', methods=["GET", 'POST'])
def authorize():
    if 'CLIENT_ID' in os.environ:
        client_id = os.environ['CLIENT_ID']
    else:
        return "error, CLIENT_ID not set", 404
    if 'REDIRECT_URI' in os.environ:
        redirect_uri = os.environ['REDIRECT_URI']

    else:
        return "error, REDIRECT_URI not set", 404
    scope = SCOPE

    state_key = create_state_key(15)
    session['state_key'] = state_key
    print(session['state_key'])
    params = {
        'client_id' : client_id,
        'response_type' : 'code',
        'redirect_uri' : redirect_uri,
        'scope': scope,
        'state': state_key

    }
    params = urllib.parse.urlencode(params, quote_via=urllib.parse.quote)
    response = jsonify(
        {"url":AUTHORIZE_URL+params}
    )
    
    return response





@app.route('/callback/', methods=["GET", "POST"])
def get_tokens():
    if request.json['state'] != session['state_key']:
        #TODO consider returning error template when this sort of thing fails like this example
        #https://github.com/lucaoh21/Spotify-Discover-2.0/blob/master/routes.py
        return "error, state failed", 404

    if request.args.get('error'):
        #TODO let frontend handle this and pass the error back here
        return "error, Spotify error when doing initial authorization"
    else:
        code = request.json['code']
        session.pop('state_key', None)

        payload = getToken(code)
        if payload != None:
            session['token'] = payload[0]
            session['refresh_token'] = payload[1]
            session['token_expiration'] = time.time() + payload[2]
        else:
            
            return "error, Error when getting the refresh and session tokens", 404
        
    current_user = getUserInformation(session)
    session['user_id'] = current_user['id']

    return "Successfully logged in", 200


        

    

    


        