import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    GOOGLE_CREDENTIALS_PATH = os.environ.get('GOOGLE_CREDENTIALS_PATH', 'credentials.json')
    SPREADSHEET_ID = os.environ.get('SPREADSHEET_ID', '1obugfOsxQKUU3q48QezodOQbx26NCoFApOtWkEbiZDY')
    CSV_FILE_PATH = os.environ.get('CSV_FILE_PATH')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///bridgehaven.db')
