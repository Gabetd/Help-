from .db import db, environment, SCHEMA, add_prefix_for_prod
# from app.models.user import User
# from app.models.business import Business
# from app.models.user import User



class Review(db.Model):
  __tablename__ = 'reviews'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  stars = db.Column(db.Integer, nullable=False)
  review = db.Column(db.String(3000))
  business_id = db.Column(db.Integer, nullable=False)
  user_id = db.Column(db.Integer, nullable=False)


  def to_dict(self, images):
    return {
      "id":self.id,
      "stars": self.stars,
      "review":self.review,
      "business_id":self.business_id,
      "user_id":self.user_id,
      "images": images
      }
