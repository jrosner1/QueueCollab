from firebase_admin import auth, exceptions, db


def get_user_object_from_email(email):
    user = auth.get_user_by_email(email)
    return user.toJSON()

def create_session(session_model):
    '''A function that creates a session entry in the firebase'''
    #TODO create some logic for immediate invites to get an email
    try:
        ref = db.reference('/')
        #Set metadata
        session_ref = ref.child('sessions')
        session_ref.update({
            session_model.playlist_id : {
                'created_at' : session_model.created_at.isoformat(),
                'home_user' : session_model.home_user,
                'session_name':session_model.session_name
            }
        })
        #Set members
        members_ref = ref.child('sessionUsers')
        members_ref.update({
            session_model.playlist_id : {
                session_model.home_user : 'home_user'
            }
        })




    
    except exceptions.FirebaseError as e:
        #TODO Handle firebaseError
        return "Error"


def create_user(user_model):
    '''A function to create a user entry in the firebase.'''
    try:
        user = auth.create_user(
            email = user_model.email,
            email_verified = user_model.email_verified,
            display_name = user_model.user_name,
            password = user_model.password,
            phone_number = user_model.phone_number,
            disabled = False
        )
        return user
    
    except Exception as ex:
        raise ex

def playlist_exists(playlist_id):
    '''A function to check if a session exists in the firebase.'''
    ref = db.reference('sessions/{}'.format(playlist_id))
    return (ref.get() is not None)






