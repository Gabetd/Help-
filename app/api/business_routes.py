from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db, Review, Business
from app.forms import BusinessForm


app.register_blueprint(business_routes, url_prefix='/api/business')

@business_routes.route('/all', methods=['GET'])
def get_all_business():
  businesses = Business.query.all()
  Buisness_Obj = [business.to_dict() for business in businesses]
  return jsonify(Buisness_Obj)

@business_routes.route('/<int:business_id>')
def business_by_id(business_id):
  business = Business.query.get(business_id)
  return jsonify(business.to_dict())

@business_routes.route('/new', methods=['POST'])
def new_business():
  form = BusinessForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  if form.validate_on_submit():
    new_business=Business(
      owner_id = data['owner_id'],
      business_name = data['business_name'],
      phone = data['phone'],
      street_address = data['street_address'],
      city = data['city'],
      zipcode = data['zipcode'],
      state = data['state'],
      description = data['description'],
      business_type = data['business_type']
    )
    db.session.add(new_business)
    db.session.commit()
    return jsonify(new_business.to_dict())
  return jsonify(form.errors)


@business_routes.route('/edit/<int:business_id>', methods=['PUT'])
def edit_business(business_id):
  form = BusinessForm()
  business = Business.query.get(business_id)
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  if business and form.validate_on_submit():
    business.owner_id = data['owner_id'],
    business.business_name = data['business_name'],
    business.phone = data['phone'],
    business.street_address = data['street_address'],
    business.city = data['city'],
    business.zipcode = data['zipcode'],
    business.state = data['state'],
    business.description = data['description'],
    business.business_type = data['business_type']
    db.session.add(new_business)
    db.session.commit()
    return jsonify(business.to_dict())
  if not business:
    return {'errors': ['That business does not exist']}, 401
  else:
    return jsonify(form.errors)


@business_routes.route('/delete/<int:business_id>', methods=['PUT'])
def del_business(business_id):
  form = BusinessForm()
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
