from app.models import db, User, environment, SCHEMA, Business, Business_Image, Review, Review_Image


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_image='https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fprofile%2520picture%2F&psig=AOvVaw2NATKDFLuffSjFAL_avSZA&ust=1671747375423000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJjnhrXei_wCFQAAAAAdAAAAABAE')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_image='https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fprofile%2520picture%2F&psig=AOvVaw2NATKDFLuffSjFAL_avSZA&ust=1671747375423000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJjnhrXei_wCFQAAAAAdAAAAABAE')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_image='https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fprofile%2520picture%2F&psig=AOvVaw2NATKDFLuffSjFAL_avSZA&ust=1671747375423000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJjnhrXei_wCFQAAAAAdAAAAABAE')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
