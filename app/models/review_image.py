from .db import db, environment, SCHEMA, add_prefix_for_prod
# from app.models.review import Review

class Review_Image(db.model):
  __tablename__ = "review_images"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"), nullable=False)
  img_url = db.Column(db.String(2000), nullable=False)

  review = db.relationship("Review", back_populates="review_img")
  def to_dict(self):
    return {
      "id":self.id,
      "review_id": self.review_id,
      "img": self.img_url
      }
