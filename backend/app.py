from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash # SECURITY IMPORT
import os
from datetime import datetime
import json

app = Flask(__name__)
CORS(app) 

# --- DATABASE CONFIGURATION ---
# 1. Try to get the database URL from Render's Environment Variables
database_url = os.environ.get('DATABASE_URL') 

# 2. Fix Render's URL format if needed (Postgres requirement)
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

# 3. Use the Cloud URL if it exists, otherwise use Localhost (fallback)
app.config['SQLALCHEMY_DATABASE_URI'] = database_url or 'postgresql://postgres:root@localhost/confluence_db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'

# Create uploads folder if it doesn't exist (Critical for Render to not crash)
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

db = SQLAlchemy(app)

# --- DATABASE MODELS ---

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(300), nullable=False) # Increased length for hash
    idea_registration = db.relationship('IdeaRegistration', backref='user', uselist=False)
    inventor_registration = db.relationship('InventorRegistration', backref='user', uselist=False)

# ==========================================
# 1. UPDATED MODELS (Add domain & sub_domain)
# ==========================================

class IdeaRegistration(db.Model):
    __tablename__ = 'idea_registrations' # Explicit table name is good practice
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Lead / Basic Info
    full_name = db.Column(db.String(100)) 
    gender = db.Column(db.String(20))
    email = db.Column(db.String(100))
    mobile = db.Column(db.String(20))
    alt_mobile = db.Column(db.String(20))
    
    # Organization Info
    institution_name = db.Column(db.String(200))
    exhibitor_type = db.Column(db.String(50))
    department = db.Column(db.String(100))
    degree = db.Column(db.String(50))
    year_study = db.Column(db.String(50))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    
    # Participation Mode
    mode = db.Column(db.String(20))
    team_name = db.Column(db.String(100))
    team_size = db.Column(db.Integer)
    team_members = db.Column(db.JSON)
    
    # --- NEW FIELDS FOR SDG ---
    domain = db.Column(db.String(150))     # New Column
    sub_domain = db.Column(db.String(150)) # New Column
    # --------------------------

    # Innovation Details
    title = db.Column(db.String(200))
    category = db.Column(db.String(100))
    other_category = db.Column(db.String(100))
    abstract_filename = db.Column(db.String(300))
    
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

class InventorRegistration(db.Model):
    __tablename__ = 'inventor_registrations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Basic Info
    full_name = db.Column(db.String(100))
    gender = db.Column(db.String(20))
    email = db.Column(db.String(100))
    mobile = db.Column(db.String(20))
    alt_mobile = db.Column(db.String(20))
    
    # Organization Info
    institution_name = db.Column(db.String(200))
    exhibitor_type = db.Column(db.String(50))
    department = db.Column(db.String(100))
    degree = db.Column(db.String(50))
    year_study = db.Column(db.String(50))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    
    # Participation Mode
    mode = db.Column(db.String(20))
    team_name = db.Column(db.String(100))
    team_size = db.Column(db.Integer)
    team_members = db.Column(db.JSON) 
    
    # --- NEW FIELDS FOR SDG ---
    domain = db.Column(db.String(150))     # New Column
    sub_domain = db.Column(db.String(150)) # New Column
    # --------------------------
    
    # Innovation Details
    title = db.Column(db.String(200))
    category = db.Column(db.String(100))
    other_category = db.Column(db.String(100))
    abstract_filename = db.Column(db.String(300))
    
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

# --- ROUTES ---

@app.route('/setup-db')
def setup_db():
    with app.app_context():
        db.create_all()
    return "Database Tables Created Successfully!"

# SECURE SIGN UP
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    
    # Check if user exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "User already exists"}), 400
    
    # Hash the password!
    hashed_password = generate_password_hash(data['password'], method='scrypt')
    
    new_user = User(email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created securely", "user_id": new_user.id})

# SECURE SIGN IN
@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    # Verify Hash instead of plain string
    if user and check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login success", "user_id": user.id, "email": user.email})
    
    return jsonify({"message": "Invalid email or password"}), 401

@app.route('/api/status/<int:user_id>', methods=['GET'])
def get_status(user_id):
    idea = IdeaRegistration.query.filter_by(user_id=user_id).first()
    inventor = InventorRegistration.query.filter_by(user_id=user_id).first()
    return jsonify({"ideaPitching": bool(idea), "inventorsExhibit": bool(inventor)})

@app.route('/api/register/idea', methods=['POST'])
def register_idea():
    try:
        # Get data from FormData
        user_id = request.form.get('userId')
        
        # ... (file upload logic here) ...
        filename = None # Placeholder for your file upload logic result

        new_idea = IdeaRegistration(
            user_id=user_id,
            # Map frontend 'leadName' to backend 'full_name'
            full_name=request.form.get('leadName'), 
            gender=request.form.get('leadGender'),
            email=request.form.get('leadEmail'),
            mobile=request.form.get('leadMobile'),
            alt_mobile=request.form.get('altMobile'),
            
            institution_name=request.form.get('institutionName'),
            exhibitor_type=request.form.get('exhibitorType'),
            department=request.form.get('department'),
            degree=request.form.get('degree'),
            year_study=request.form.get('yearOfStudy'),
            city=request.form.get('city'),
            state=request.form.get('state'),
            
            mode=request.form.get('participationMode'),
            team_name=request.form.get('teamName'),
            team_size=request.form.get('teamSize'),
            team_members=request.form.get('teamMembers'), # This comes as a JSON string
            
            # --- SAVE THE NEW SDG FIELDS ---
            domain=request.form.get('domain'),
            sub_domain=request.form.get('subDomain'),
            # -------------------------------

            title=request.form.get('title'),
            category=request.form.get('category'),
            other_category=request.form.get('otherCategory'),
            abstract_filename=filename
        )

        db.session.add(new_idea)
        db.session.commit()
        return jsonify({"message": "Idea Registered Successfully"}), 201

    except Exception as e:
        print(e)
        return jsonify({"message": "Registration Failed", "error": str(e)}), 500

@app.route('/api/register/inventor', methods=['POST'])
def register_inventor():
    try:
        user_id = request.form.get('userId')
        
        # ... (file upload logic here) ...
        filename = None 

        new_inventor = InventorRegistration(
            user_id=user_id,
            full_name=request.form.get('fullName'),
            gender=request.form.get('gender'),
            email=request.form.get('email'),
            mobile=request.form.get('mobile'),
            alt_mobile=request.form.get('altMobile'),
            
            institution_name=request.form.get('institutionName'),
            exhibitor_type=request.form.get('exhibitorType'),
            department=request.form.get('department'),
            degree=request.form.get('degree'),
            year_study=request.form.get('yearOfStudy'),
            city=request.form.get('city'),
            state=request.form.get('state'),
            
            mode=request.form.get('participationMode'),
            team_name=request.form.get('teamName'),
            team_size=request.form.get('teamSize'),
            team_members=request.form.get('teamMembers'),
            
            # --- SAVE THE NEW SDG FIELDS ---
            domain=request.form.get('domain'),
            sub_domain=request.form.get('subDomain'),
            # -------------------------------

            title=request.form.get('title'),
            category=request.form.get('category'),
            other_category=request.form.get('otherCategory'),
            abstract_filename=filename
        )

        db.session.add(new_inventor)
        db.session.commit()
        return jsonify({"message": "Inventor Exhibit Registered Successfully"}), 201

    except Exception as e:
        print(e)
        return jsonify({"message": "Registration Failed", "error": str(e)}), 500

# --- SERVE UPLOADED FILES ---
# This allows you to view files at: http://localhost:5000/uploads/filename.pdf
@app.route('/uploads/<name>')
def download_file(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)

if __name__ == '__main__':
    app.run(debug=True, port=5000)