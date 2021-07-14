from flask import jsonify, request, make_response
from flask_restful import Resource
from common.firebase_util import generate_token
from marshmallow import Schema, fields, post_load, ValidationError
from Models import UserModel

class UserSchema(Schema):
    display_name = fields.Str()
    email = fields.Email()
    created_at = fields.DateTime(required=False)
    password = fields.Str()
    phone_number = fields.Str()
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
            token = generate_token(user.uid)
            '''
            response = jsonify(
                    {"msg": "User created successfully", "token":token.decode()}
                ),
                '''
            return {"msg":"User created successfully", "token":token.decode()}, 200

        except ValidationError as err:
            return {"msg":err.messages}, 400
        except TypeError as err:
            return {"msg": "Missing information to create the user"}, 400
        except:
            return {"msg": "Other error"}, 400
        



