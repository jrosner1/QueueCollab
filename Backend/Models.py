from common.firebase_util import create_user
import datetime as dt

class UserModel:
    def __init__(self, name, email, display_name, password, phone_number):
        self.name = name
        self.created_at = dt.datetime.now()
        self.email_verified = False
        self.email = email
        self.display_name = display_name
        self.password = password
        self.email_verified = False
        self.phone_number = phone_number
    def save_to_db(self):
        return create_user(self.email, self.display_name, self.password, self.phone_number)

class PartyModel:
    def __init__(self, name, host_id):
        self.name = name
        self.host_id = host_id
        self.members = [host_id]