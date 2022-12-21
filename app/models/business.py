from flask_sqlalchemy import SQLAlchemy
from .user import User

db = SQLAlchemy()

class Business(db.Model):
    __tablename__ = "businesses"

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    business_name = db.Column(db.String(40), nullable=False)
    phone = db.Column(db.String(12), nullable=False)
    street_address = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(20), nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    state = db.Column(db.String(15), nullable=False)
    description = db.Column(db.String(3000), nullable=False)
    business_type = db.Column(db.String, nullable=False)

    owner = db.relationship("User", back_populates="businesses")
    reviews = db.relationship("Review", back_populates="businesses")

    def to_dict(self):
        return {
            "id":self.id,
            "owner_id":self.owner_id,
            "business_name":self.business_name,
            "phone":self.phone,
            "street_address":self.street_address,
            "city":self.city,
            "zipcode":self.zipcode,
            "state":self.state,
            "desctiption":self.description,
            "business_type": self.business_type
            # "business_image": images
        }
