import sqlite3

# Connect to the SQLite database (creates file if it doesn't exist)
conn = sqlite3.connect('users.db')
cursor = conn.cursor()

# Create 'users' table
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    dob DATE NOT NULL,
    password TEXT NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    last_login TIMESTAMP,
    login_count INTEGER DEFAULT 0
)
''')

# Create 'admin_actions' table
cursor.execute('''
CREATE TABLE IF NOT EXISTS admin_actions (
    action_id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id INTEGER,
    user_id INTEGER,
    action TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')

# Commit changes and close connection
conn.commit()
conn.close()

print("Database setup completed!")
