from .db import db, environment, SCHEMA, add_prefix_for_prod
# from app.models.user import User
# from app.models.business import Business
# from app.models.user import User



class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    stars = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(3000))
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


    user = db.relationship("User", back_populates="reviews")
    businesse = db.relationship("Business", back_populates="rev")
    review_img = db.relationship("Review_Image", back_populates="review")


    def to_dict(self):
        return {
            "id":self.id,
            "stars": self.stars,
            "review":self.review,
            "business_id":self.business_id,
            "user_id":self.user_id

        }
