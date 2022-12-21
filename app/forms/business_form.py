from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FieldList, FormField, Field, DateField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models.business import Business

class BusinessForm(FlaskForm):
  owner_id = IntegerField('Owner_Id', validators=[DataRequired()])
  business_name = StringField('Business_Name', validators=[DataRequired()])
  phone = StringField('Phone', validators=[DataRequired()])
  street_address = StringField('Street_Address', validators=[DataRequired()])
  city = StringField('City', validators)
  zipcode = IntegerField('Zipcode', validators=[DataRequired()])
  state = StringField('State', validators=[DataRequired()])
  description = StringField('Description', validators=[DataRequired()])
  business_type = SelectField('Business_Type', choices=[(1,'Restaurant'), (2, 'Home Repair'), (3, 'Auto Repair'), (4, 'Personal Improvement')]validators=[DataRequired()])
