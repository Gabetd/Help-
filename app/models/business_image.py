from flask_sqlalchemy import SQLAlchemy
from .business import Business

db = SQLAlchemy()

class Business_Image(db.Model):
  