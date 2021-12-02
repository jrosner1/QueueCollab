from flask import request
from flask.json import jsonify
from api import app
from marshmallow import Schema, fields, post_load, ValidationError
from Models import UserModel


class UserSchema(Schema):
    '''A class that defines the fields that a user has for use with marshalling post requests.'''
    display_name = fields.Str()
    email = fields.Email()
    created_at = fields.DateTime(required=False)
    password = fields.Str()
    phone_number = fields.Str()
    email_verified = fields.Bool(required=False)

    @post_load
    def make_user(self, data, **kwargs):
        return UserModel(**data)


@app.route('/User', methods=['GET', 'POST'])
def post():
    '''A route for creation of a user.'''
    try:
        schema = UserSchema()
        user = schema.load(request.json)
        user = user.save_to_db()

        response = jsonify(
                {"msg": "User created successfully"}
            )
        response.headers.add('Access-Control-Allow-Headers',
                         "Origin, X-Requested-With, Content-Type, Accept, x-auth")
        
        return response

    except ValidationError as err:
        return {"msg":err.messages}, 400
    except TypeError as err:
        return {"msg": "Missing information to create the user"}, 400
    except:
        return {"msg": "Other error"}, 400
        



