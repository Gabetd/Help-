from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy
# from app.models.user import User
# from app.models.review import Review
# from app.models.business_image import Business_Image


class Business(db.Model):
    __tablename__ = "businesses"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer, nullable=False)
    business_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(12), nullable=False)
    street_address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    state = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(3000), nullable=False)
    business_type = db.Column(db.String(255), nullable=False)

    def to_dict(self):
    # , images):
        return {
            "id":self.id,
            "owner_id":self.owner_id,
            "business_name":self.business_name,
            "phone":self.phone,
            "street_address":self.street_address,
            "city":self.city,
            "zipcode":self.zipcode,
            "state":self.state,
            "description":self.description,
            "business_type": self.business_type,
            # "images": images
        }
