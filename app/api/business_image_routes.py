from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Business, Business_Image
from app.forms.business_form import BusinessForm

business_image_routes = Blueprint('business-image', __name__, url_prefix='/api/business-image')
