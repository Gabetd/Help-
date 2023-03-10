from flask import Blueprint, request
from app.models import db, Business
from flask_login import current_user, login_required
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("image", __name__, url_prefix='/api/image')


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
  print('*************************** In the Route ********************')
  image = request.files["image"]
  print('***********************************image=', image)
  if "image" not in request.files:
    return {"errors": "image required"}, 400
  print(image, "this is the image")

  if not allowed_file(image.filename):
      return {"errors": "file type not permitted"}, 400

  image.filename = get_unique_filename(image.filename)

  upload = upload_file_to_s3(image)
  print('***********************************upload=', upload)

  return upload
