from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FieldList, FormField, Field, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

class ReviewForm(FlaskForm):
  stars = IntegerField('Stars', validators=[DataRequired()])
  review = StringField('Review')
  business_id = IntegerField('Business_Id', validators=[DataRequired()])
  user_id = IntegerField('User_Id', validators=[DataRequired()])
  
