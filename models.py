from app import db

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    card_number = db.Column(db.String(16))
    card_holder_name = db.Column(db.String(100))
    expiration_date = db.Column(db.String(5))
    cvv = db.Column(db.String(3))
    amount = db.Column(db.Float)
    location = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<Transaction {self.id}>'
