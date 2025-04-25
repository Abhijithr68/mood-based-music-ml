# 🎵 Mood-Based Music Recommendation System --- EMOTUNES

## 🚀 Project Description

The **Mood-Based Music Recommendation System -- EMOTUNES** is a full-stack web application that detects a user's emotional state using machine learning and recommends songs tailored to that mood through the **Spotify API**. The app captures a snapshot from the user's webcam, processes the image using deep learning techniques, and classifies the mood (e.g., happy, sad, neutral, angry). Based on this classification, a relevant playlist is provided.

This system features secure **user authentication** (signup/login), with credentials stored in an **SQLite3 database** and passwords encrypted using **bcrypt**. It offers a modern and interactive UI built with **React.js**, while the backend is developed using **Flask**, **TensorFlow**, and **OpenCV**.

---

## 🛠️ Features

- 🎭 Real-time **Mood Detection** using webcam and deep learning.
- 🎧 Emotion-based **Spotify Music Recommendations**.
- 🔐 Secure **Signup/Login system** with encrypted credentials.
- 🗃️ **SQLite3 Database** integration for storing user data.
- 🔗 Seamless **frontend-backend communication** using `axios` and `CORS`.
- 🧠 **ML Integration** using TensorFlow and OpenCV.
- 🖼️ Clean and responsive UI built with **React.js**, **HTML**, and **CSS**.

---

## 🔧 Technologies Used

| Layer        | Technologies                                       |
|--------------|----------------------------------------------------|
| **Frontend** | React.js, HTML5, CSS3, Axios                       |
| **Backend**  | Flask, Python, TensorFlow, OpenCV                  |
| **Database** | SQLite3                                            |
| **Security** | bcrypt (Password Encryption), flask-cors (CORS)    |
| **API**      | Spotify API                                        |

---

## 📸 Screenshots

> ⚠️ *Replace these with your actual GitHub links after uploading screenshots to the `/screenshots/` folder in your repository.*

- **Mood Detection Interface**  
  ![Mood Detection](https://github.com/Abhijithr68/mood-based-music-ml/blob/main/snaps/Screenshot%202025-04-24%20140602.png)

- **Login Page**  
  ![Login](https://github.com/Abhijithr68/mood-based-music-ml/blob/main/snaps/Screenshot%202025-04-24%20140507.png)

- **Signup Page**  
  ![Signup](https://github.com/Abhijithr68/mood-based-music-ml/blob/main/snaps/Screenshot%202025-04-24%20140527.png)

---

## 🏗️ Setup & Installation

To run the project locally, follow these steps:

1. **Clone the repo:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```

3. **Install frontend dependencies (Node modules):**
    ```bash
    cd frontend
    npm install
    ```

4. **Install backend dependencies:**
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

5. **Run the frontend:**
    ```bash
    cd frontend
    npm start
    ```

6. **Run the backend:**
    ```bash
    cd backend
    python app.py
    ```

Your app should now be running locally. Open `http://localhost:3000` in your browser to interact with it!

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
