from flask import json, request
from flask_restful import Resource
from common.firebase_util import generate_token
from marshmallow import Schema, fields, post_load, ValidationError
from Models import UserModel

class UserSchema(Schema):
    name = fields.Str()
    email = fields.Email()
    created_at = fields.DateTime(required=False)
    password = fields.Str()
    phone_number = fields.Str()
    display_name = fields.Str(required=False)
    email_verified = fields.Bool(required=False)

    @post_load
    def make_user(self, data, **kwargs):
        return UserModel(**data)

class User(Resource):
    def post(self):
        try:
            schema = UserSchema()
            user = schema.load(request.json)
            user = user.save_to_db()
            #TODO send JWT token of sign in after the user has created their account
            token = generate_token(user.uid)
            return {"msg": "User created successfully", "token":""}, 201
        except ValidationError as err:
            return err.messages, 400
        except TypeError as err:
        
            return {"msg": "Missing information to create the user"}, 400
        



