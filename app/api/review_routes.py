from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Review, Business, Review_Image
from app.forms.review_form import ReviewForm

review_routes = Blueprint('review', __name__, url_prefix='/api/review')

@review_routes.route('/all', methods=['GET'])
def get_all_reviews():
  form = ReviewForm()
  reviews = Review.query.all()
  print('**********************,reviews', reviews)
  # review_obj = [review.to_dict() for review in reviews]
  review_list = []
  for review in reviews:
    images = Review_Image.query.filter(Review_Image.review_id == review.id).all()
    business = Business.query.get(review.business_id)
    user = User.query.get(review.user_id)
    image_obj = [image.to_dict() for image in images]
    review_list.append(review.to_dict_express(image_obj, business.to_dict(), user.to_dict()))
  return jsonify(review_list)


@review_routes.route('/business/<int:business_id>', methods=['GET'])
def review_by_business_id(business_id):
  reviews = Review.query.filter(Review.business_id == business_id).all()
  # review_obj = [review.to_dict() for review in reviews]
  review_list = []
  for review in reviews:
    images = Review_Image.query.filter(Review_Image.review_id == review.id).all()
    business = Business.query.get(review.business_id)
    user = User.query.get(review.user_id)
    image_obj = [image.to_dict() for image in images]
    review_list.append(review.to_dict_express(image_obj, business.to_dict(), user.to_dict()))
  return jsonify(review_list)

@review_routes.route('/new/<int:business_id>', methods=['POST'])
@login_required
def new_review(business_id):
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
    images = Review_Image.query.filter(Review_Image.review_id == new_review.id).all()
    business = Business.query.get(new_review.business_id)
    user = User.query.get(new_review.user_id)
    image_obj = [image.to_dict() for image in images]
    return jsonify(new_review.to_dict_express(image_obj, business.to_dict(), user.to_dict()))
  return jsonify(form.errors)

@review_routes.route("/<int:review_id>", methods=["PUT"])
@login_required
def edit_review(review_id):
  review= Review.query.get(review_id)
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
    images = Review_Image.query.filter(Review_Image.review_id == new_review.id).all()
    business = Business.query.get(new_review.business_id)
    user = User.query.get(new_review.user_id)
    image_obj = [image.to_dict() for image in images]
    return jsonify(review.to_dict_express(image_obj, business.to_dict(), user.to_dict()))
  return jsonify(form.errors)


@review_routes.route('/delete/<int:review_id>', methods=["DELETE"])
@login_required
def delete_review(review_id):
  review = Review.query.get(id)
  if not review:
    return {'errors': ['That review does not exist']}, 401
  db.session.delete(review)
  db.session.commit()
  return jsonify("Successfully deleted review")

@review_routes.route('/<int:review_id>', methods=['GET'])
def review_by_id(review_id):
  review = Review.query.get(review_id)
  images = Review_Image.query.filter(Review_Image.review_id == new_review.id).all()
  business = Business.query.get(new_review.business_id)
  user = User.query.get(new_review.user_id)
  image_obj = [image.to_dict() for image in images]
  return jsonify(review.to_dict_express(image_obj, business.to_dict(), user.to_dict()))
