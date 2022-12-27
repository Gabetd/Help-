from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Review, Business
from app.forms.review_form import ReviewForm

review_routes = Blueprint('review', __name__, url_prefix='/api/review')

@review_routes.route('/all')
def get_all_reviews():
  form = ReviewForm()
  