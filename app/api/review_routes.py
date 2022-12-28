from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Review, Business
from app.forms.review_form import ReviewForm

review_routes = Blueprint('review', __name__, url_prefix='/api/review')

@review_routes.route('/all')
def get_all_reviews():
  form = ReviewForm()
  reviews = Review.query.all()
  review_obj = [review.to_dict() for review in reviews]
  return jsonify(review_obj)


@review_routes.route('/<int:review_id>')
def review_by_id(review_id):
  review = Review.query.get(review_id)
  return jsonify(review.to_dict)

@review_routes.route('/new', methods=['POST'])
@login_required
def new_review():
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  if form.validate_on_submit():
    new_review = Review(
      stars = data['stars'],
      review = data['review'],
      business_id = data['business_id'],
      user_id = data['user_id']
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_dict())
  return jsonify(form.errors)

@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_review(id):
  review= Review.query.get(id)
  if not review:
    return {'errors': ['That review does not exist']}, 401
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    # data = form.data
    review.stars = form.stars.data,
    review.review = form.review.data,
    review.business_id = form.business_id.data,
    review.user_id = form.user_id.data
    db.session.commit()
    return review.to_dict()
  return jsonify(form.errors)


@review_routes.route('/<int:review_id>', methods=["DELETE"])
@login_required
def delete_review(review_id):
  review = Review.query.get(id)
  if not review:
    return {'errors': ['That review does not exist']}, 401
  db.session.delete(review)
  db.session.commit()
  return jsonify("Successfully deleted review")
