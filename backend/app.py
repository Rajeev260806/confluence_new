from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import datetime
import json

app = Flask(__name__)
CORS(app) 

# --- DATABASE CONFIGURATION ---
database_url = os.environ.get('DATABASE_URL') 
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_url or 'postgresql://postgres:root@localhost/confluence_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

db = SQLAlchemy(app)

# --- HELPER: FILE UPLOAD ---
def save_file(file_obj):
    if file_obj and file_obj.filename != '':
        filename = secure_filename(file_obj.filename)
        # Add timestamp to filename to avoid duplicates
        unique_name = f"{int(datetime.utcnow().timestamp())}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_name)
        file_obj.save(file_path)
        return unique_name
    return None

# --- DATABASE MODELS ---

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(300), nullable=False)
    idea_registration = db.relationship('IdeaRegistration', backref='user', uselist=False)
    inventor_registration = db.relationship('InventorRegistration', backref='user', uselist=False)

class IdeaRegistration(db.Model):
    __tablename__ = 'idea_registrations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Team Details
    team_name = db.Column(db.String(100))
    team_size = db.Column(db.Integer)
    # Storing the complex members array as a JSON string
    members = db.Column(db.Text) 
    
    # Domain
    domain = db.Column(db.String(150))
    sub_domain = db.Column(db.String(150))
    
    # Innovation Details
    title = db.Column(db.String(200))
    problem_statement = db.Column(db.Text) # New
    solution = db.Column(db.Text)          # New
    trl_level = db.Column(db.String(50))   # New
    
    # Files
    product_file = db.Column(db.String(300))
    media_file = db.Column(db.String(300))
    
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

class InventorRegistration(db.Model):
    __tablename__ = 'inventor_registrations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Team Details
    team_name = db.Column(db.String(100))
    team_size = db.Column(db.Integer)
    members = db.Column(db.Text) # Storing JSON string
    
    # Domain
    domain = db.Column(db.String(150))
    sub_domain = db.Column(db.String(150))
    
    # Innovation Details
    title = db.Column(db.String(200))
    problem_statement = db.Column(db.Text)
    solution = db.Column(db.Text)
    trl_level = db.Column(db.String(50))
    
    # Requirements
    space_requirements = db.Column(db.Text) # New

    # Files
    product_file = db.Column(db.String(300))
    media_file = db.Column(db.String(300))
    
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

# --- ROUTES ---

@app.route('/setup-db')
def setup_db():
    with app.app_context():
        db.create_all()
    return "Database Tables Created Successfully!"

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "User already exists"}), 400
    hashed_password = generate_password_hash(data['password'], method='scrypt')
    new_user = User(email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created securely", "user_id": new_user.id})

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login success", "user_id": user.id, "email": user.email})
    return jsonify({"message": "Invalid email or password"}), 401

@app.route('/api/status/<int:user_id>', methods=['GET'])
def get_status(user_id):
    idea = IdeaRegistration.query.filter_by(user_id=user_id).first()
    inventor = InventorRegistration.query.filter_by(user_id=user_id).first()
    return jsonify({"ideaPitching": bool(idea), "inventorsExhibit": bool(inventor)})

# --- REGISTER IDEA ---
@app.route('/api/register/idea', methods=['POST'])
def register_idea():
    try:
        # 1. Handle Files
        p_file = save_file(request.files.get('productFile'))
        m_file = save_file(request.files.get('mediaFile'))

        # 2. Create Record
        new_idea = IdeaRegistration(
            user_id=request.form.get('userId'),
            
            # Team Info
            team_name=request.form.get('teamName'),
            team_size=request.form.get('teamSize'),
            members=request.form.get('members'), # JSON String
            
            # Domain
            domain=request.form.get('domain'),
            sub_domain=request.form.get('subDomain'),

            # Details
            title=request.form.get('title'),
            problem_statement=request.form.get('problemStatement'),
            solution=request.form.get('solution'),
            trl_level=request.form.get('trlLevel'),
            
            # Files
            product_file=p_file,
            media_file=m_file
        )

        db.session.add(new_idea)
        db.session.commit()
        return jsonify({"message": "Idea Registered Successfully"}), 201

    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "Registration Failed", "error": str(e)}), 500

# --- REGISTER INVENTOR ---
@app.route('/api/register/inventor', methods=['POST'])
def register_inventor():
    try:
        # 1. Handle Files
        p_file = save_file(request.files.get('productFile'))
        m_file = save_file(request.files.get('mediaFile'))

        # 2. Create Record
        new_inventor = InventorRegistration(
            user_id=request.form.get('userId'),
            
            # Team Info
            team_name=request.form.get('teamName'),
            team_size=request.form.get('teamSize'),
            members=request.form.get('members'), # JSON String
            
            # Domain
            domain=request.form.get('domain'),
            sub_domain=request.form.get('subDomain'),

            # Details
            title=request.form.get('title'),
            problem_statement=request.form.get('problemStatement'),
            solution=request.form.get('solution'),
            trl_level=request.form.get('trlLevel'),
            space_requirements=request.form.get('spaceRequirements'),
            
            # Files
            product_file=p_file,
            media_file=m_file
        )

        db.session.add(new_inventor)
        db.session.commit()
        return jsonify({"message": "Inventor Exhibit Registered Successfully"}), 201

    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "Registration Failed", "error": str(e)}), 500

@app.route('/uploads/<name>')
def download_file(name):
    return send_from_directory(app.config["UPLOAD_FOLDER"], name)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)