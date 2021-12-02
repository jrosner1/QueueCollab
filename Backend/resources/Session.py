from flask import request, jsonify
from common.firebase_util import playlist_exists
from api import app
from marshmallow import Schema, fields, post_load, ValidationError
from Models import SessionModel

class SessionSchema(Schema):
    '''A class to define the structure of a session for use in marshalling post requests.'''
    home_user = fields.Str()
    playlist_id = fields.Str()
    created_at = fields.DateTime(required=False)
    session_name = fields.Str()
    
    @post_load
    def make_playlist(self, data, **kwargs):
        return SessionModel(**data)



@app.route('/Session/<playlist_id>', methods=['GET', 'POST'])
def get_or_create_session(playlist_id):
    '''
        A method to confirm that a playlist exists if GET is requested, or create a new playlist if POST
        is selected.
    '''
    if request.method == 'GET':
        if playlist_exists(playlist_id):
            
            return "ok", 200
        else:
            return "Session Not Found", 404
    if request.method == 'POST':
        if playlist_exists(playlist_id):
            return "Playlist_id_taken", 400
        else:
            try:
                schema = SessionSchema()
                session = schema.load(request.json)
                session = session.save_to_db()
                response = jsonify(
                    {"msg" : "Playlist created successfully"}
                )

                return response


            except ValidationError as err:
                return {"msg": err.messages}, 400

            
        
