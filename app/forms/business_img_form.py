from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FieldList, FormField, Field, DateField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models.business_image import Business_Image

class BusinessImageForm(FlaskForm):
  business_id = IntegerField('Business_Id', validators=[DataRequired()])
  img_url = StringField('Img_Url', validators=[DataRequired()])
