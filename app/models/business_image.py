from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .business import Business


class Business_Image(db.Model):
  __tablename__ = 'buiness_images'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  business_id = db.Column(db.Integer, nullable=False)
  img_url = db.Column(db.String(2000), nullable=False)

  def to_dict(self):
    return {
      "id":self.id,
      "business_id": self.business_id,
      "img": self.img_url
      }
