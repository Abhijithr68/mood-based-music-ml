from flask import Flask, request, jsonify
from flask_cors import CORS  # To handle CORS
from spotipy import Spotify
from spotipy.oauth2 import SpotifyClientCredentials
from deepface import DeepFace
import base64
import numpy as np
import cv2
import sqlite3
import bcrypt

app = Flask(__name__)
CORS(app)  # Enable CORS for the app

# Spotify API authentication
spotify = Spotify(auth_manager=SpotifyClientCredentials(
    client_id="e389b15858464e4daa29c730834b7757",  # Replace with your Spotify Client ID
    client_secret="02d31fb05a1a4bd1ae27824ec353be9b"  # Replace with your Spotify Client Secret
))
# Database setup (ensure the database is already created)
def get_db():
    conn = sqlite3.connect('./database/users.db')
    return conn

@app.route('/', methods=['GET'])
def home():
    return "Flask server is running!"

# Signup endpoint to store user data
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()  # Get data sent from frontend (React)

    name = data.get('name')
    dob = data.get('dob')
    email = data.get('email')
    password = data.get('password')

    # Check if the user already exists
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({'message': 'User already exists!'}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    # Insert the new user into the database
    cursor.execute(
        'INSERT INTO users (name, dob, email, password) VALUES (?, ?, ?, ?)',
        (name, dob, email, hashed_password.decode('utf-8'))
    )
    conn.commit()
    conn.close()

    return jsonify({'message': 'Registration successful!'}), 200

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    conn = get_db()
    cursor = conn.cursor()

    # Check if user exists
    cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
    user = cursor.fetchone()

    if user:
     # Compare the provided password with the stored hashed password
     entered_password = password.encode('utf-8')  # User entered password (plain text)
     stored_hash = user[4].encode('utf-8')  # Stored hash from the database

     print(f"Entered password (encoded): {entered_password}")
     print(f"Stored password hash (encoded): {stored_hash}")

     # Check password validity
     if bcrypt.checkpw(entered_password, stored_hash):
        print("Passwords match!")
        return jsonify({'message': 'Login successful!', 'user_id': user[0]}), 200
     else:
        print("Passwords don't match!")
        return jsonify({'message': 'Invalid password!'}), 400
    else:
     return jsonify({'message': 'User not found!'}), 404
    
# DeepFace emotion detection endpoint
@app.route('/detect_mood', methods=['POST'])
def detect_mood():
    try:
        data = request.json
        image_data = data['image']

        # Decode the base64 image
        image_data = image_data.split(",")[1]  # Remove data:image/jpeg;base64, part
        decoded_image = base64.b64decode(image_data)
        np_image = np.frombuffer(decoded_image, np.uint8)
        img = cv2.imdecode(np_image, cv2.IMREAD_COLOR)

        # Use DeepFace to detect emotions
        result = DeepFace.analyze(img, actions=['emotion'])

        # Extract the dominant emotion
        dominant_emotion = result[0]['dominant_emotion']

        return jsonify({"mood": dominant_emotion})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/recommend_songs', methods=['POST'])
def recommend_songs():
    # Get the mood from the frontend
    data = request.json
    mood = data.get('mood')

    # Use Spotify API to fetch songs based on the mood
    results = spotify.search(q=mood, type='track', limit=5)  # Search for tracks
    songs = [
        {
            "name": track["name"],
            "artist": track["artists"][0]["name"],
            "url": track["external_urls"]["spotify"]
        }
        for track in results["tracks"]["items"]
    ]

    # Return the songs to the frontend
    return jsonify({"songs": songs})
if __name__ == '__main__':
    app.run(debug=True)
