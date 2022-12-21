from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FieldList, FormField, Field, DateField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models.review_images import Review_Image

class ReviewImageForm(FlaskForm):
  review_id = IntegerField('Review_Id', validators=[DataRequired()])
  img_url = StringField('Img_Url', validators=[DataRequired()])
