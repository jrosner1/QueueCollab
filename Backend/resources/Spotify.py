
from flask import session, request, redirect
from flask_restful import Resource
from urllib.parse import quote
import spotipy
import os
import uuid
SCOPE = "user-read-currently-playing playlist-modify-private"
'''
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
'''

#Cache logic follows in order to create sessions for spotify
caches_folder = '../.spotify_caches/'
if not os.path.exists(caches_folder):
    #Ensure cache folder exists
    os.makedirs(caches_folder)

def session_cache_path():
    return caches_folder + session.get('uuid')


class Spotify(Resource):
    def get(self):
        if not session.get('uuid'):
            #Visitor is unknown
            session['uuid'] = str(uuid.uuid4())
        cache_handler = spotipy.cache_handler.CacheFileHandler(cache_path=session_cache_path())
        auth_manager = spotipy.oauth2.SpotifyOAuth(scope=SCOPE, cache_handler=cache_handler, show_dialog=True)

        if request.args.get("code"):
            auth_manager.get_access_token(request.args.get("code"))
            print("here")
            return redirect('/')
        if not auth_manager.validate_token(cache_handler.get_cached_token()):
            #Display sign in link when den't see a token
            auth_url = auth_manager.get_authorize_url()
            print("over here")
            return {"link_url":f"{auth_url}"}

        #Now we are signed in, desplay data
        spotify = spotipy.Spotify(auth_manager=auth_manager)
        print("over over here")
        return {"user":f'{spotify.me()["display_name"]}'}


        