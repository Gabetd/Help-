from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .business import Business


class Business_Image(db.Model):
  __tablename__ = 'buiness_images'
  id = db.Column(db.Integer, primary_key=True)
  business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
  img_url = db.Column(db.String(2000), nullable=False)

  businesses = db.relationship("Business", back_populates="business_img")
