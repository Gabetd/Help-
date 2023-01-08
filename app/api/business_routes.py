from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Review, Business, Business_Image
from app.forms.business_form import BusinessForm
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)

business_routes = Blueprint('business', __name__, url_prefix='/api/business')

@business_routes.route('/all', methods=['GET'])
def get_all_business():
  businesses = Business.query.all()
  # Buisness_Obj = [business.to_dict() for business in businesses]
  business_list=[]
  for business in businesses:
    images = Business_Image.query.filter(Business_Image.business_id == business.id).all()
    reviews = Review.query.filter(Review.business_id == business.id).all()
    rating = [review.to_dict() for review in reviews]
    user = User.query.get(business.owner_id)
    business_list.append(business.to_dict_express(user.to_dict(), images, rating))
  return jsonify(business_list)

@business_routes.route('/<int:business_id>')
def business_by_id(business_id):
  business = Business.query.get(business_id)
  images = Business_Image.query.filter(Business_Image.business_id == business.id).all()
  reviews = Review.query.filter(Review.business_id == business.id).all()
  rating = [review.to_dict() for review in reviews]
  user = User.query.get(business.owner_id)
  return jsonify(business.to_dict_express(user.to_dict(), images, rating))

@business_routes.route('/new', methods=['POST'])
@login_required
def new_business():
  form = BusinessForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  if form.validate_on_submit():
    business=Business(
      owner_id = data['owner_id'],
      preview_img = data['preview_img'],
      business_name = data['business_name'],
      phone = data['phone'],
      street_address = data['street_address'],
      city = data['city'],
      zipcode = data['zipcode'],
      state = data['state'],
      description = data['description'],
      business_type = data['business_type']
    )
    db.session.add(business)
    db.session.commit()
    images = Business_Image.query.filter(Business_Image.business_id == business.id).all()
    reviews = Review.query.filter(Review.business_id == business.id).all()

    rating = [review.to_dict() for review in reviews]
    user = User.query.get(business.owner_id)
    return jsonify(business.to_dict_express(user.to_dict(), images, rating))
  return jsonify(form.errors)


@business_routes.route('/edit/<int:business_id>', methods=['PUT'])
@login_required
def edit_business(business_id):
  business = Business.query.get(business_id)
  form = BusinessForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if business and form.validate_on_submit():
    # data = form.data
    print('***********************************', data, '************************************')
    business.owner_id = form.owner_id.data,
    business.business_name = form.business_name.data,
    business.phone = form.phone.data,
    business.street_address = form.street_address.data,
    business.city = form.city.data,
    business.zipcode = form.zipcode.data,
    business.state = form.state.data,
    business.description = form.description.data,
    business.business_type = form.business_type.data
    db.session.commit()
    business = Business.query.get(business_id)
    images = Business_Image.query.filter(Business_Image.business_id == business.id).all()
    reviews = Review.query.filter(Review.business_id == business.id).all()
    rating = [review.to_dict() for review in reviews]
    user = User.query.get(business.owner_id)
    return jsonify(business.to_dict_express(user.to_dict(), images, rating))
  if not business:
    return {'errors': ['That business does not exist']}, 401
  else:
    return jsonify(form.errors)


@business_routes.route('/delete/<int:business_id>', methods=['Delete'])
@login_required
def del_business(business_id):
  # form = BusinessForm()
  business = Business.query.get(business_id)
  reviews = Review.query.filter(business_id == business_id).all()
  if Business:
    for review in reviews:
      db.session.delete(review)
      db.session.commit()
    db.session.delete(business)
    db.session.commit()
    return jsonify('Successfully deleted business and associated reviews')
  return {'errors': ['That business does not exist']}, 401
