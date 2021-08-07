import base64, requests, os, time

def getUserInformation(session):
	url = 'https://api.spotify.com/v1/me'
	payload = make_get_request(session, url)

	if payload == None:
		return None

	return payload

#Method to get access token, refresh token, and expiry time from spotify
def getToken(code):
    token_url = 'https://accounts.spotify.com/api/token'
    if 'CLIENT_SECRET' in os.environ:
        authorization = 'Basic ' + base64.b64encode(os.environ['CLIENT_ID'] + ':' + os.environ['CLIENT_SECRET'])
        redirect_uri = os.environ['REDIRECT_URI']

        headers = {'Authorization': authorization, 'Accept':'application/json', 'Content-Type': 'application/x-ww-form-urlenoded'}
        body = {'code': code, 'redirect_uri': redirect_uri, 'grant_type': 'authorization_code'}
        post_response = requests.post(token_url, headers=headers, data=body)

        #200 code indicates access token granted
        if post_response.status_code == 200:
            json = post_response.json()
            return json['access_token'], json['refresh_token'], json['expires_in']
        else:
            print("response from spotify not okay. Response status: " + post_response.status_code)
            return None
    else:
        print("There is no CLIENT_SECRET")
        return None

def refresh_tokens(session):
    if time.time() > session['token_expiration']:
        token_url = 'https://accounts.spotify.com/api/token'
        authorization = 'Basic ' + base64.b64encode(os.environ['CLIENT_ID'] + ':' + os.environ['CLIENT_SECRET'])
        headers = {'Authorization': authorization, 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'}
        body = {'refresh_token': session['refresh_token'], 'grant_type': 'refresh_token'}
        post_response = requests.post(token_url, headers=headers, data=body)
        if post_response.status_code == 200:
            return post_response.json()['access_token'], post_response.json()['expires_in']
        else:
            print("error refreshing tokens")
            return None




def make_get_request(session, url, params={}):
    headers = {"Authorization": "Bearer {}".format(session['token'])}
    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        return response.json()

    #If 401 occurs, update tokens because tokens have expired
    elif response.status_code == 401 and refresh_tokens(session) != None:
        return make_get_request(session, url, params)
    else:
        print("error making the get request")
        return None