from common.firebase_util import create_user, create_session
import datetime as dt

class UserModel:
    def __init__(self, display_name, email, password, phone_number):
        self.created_at = dt.datetime.now()
        self.user_name = display_name
        self.email_verified = False
        self.email = email
        self.password = password
        self.phone_number = phone_number
    def save_to_db(self):
        return create_user(self)

class SessionModel:
    def __init__(self, home_user, playlist_id, session_name):
        self.created_at = dt.datetime.now()
        self.home_user = home_user
        self.playlist_id = playlist_id
        self.session_name = session_name
    def save_to_db(self):
        return create_session(self)