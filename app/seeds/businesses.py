from app.models import db, Business, environment, SCHEMA

def seed_businesses():
    TacoBell = Business(
        id=1,
        owner_id=1, business_name='Taco Bell', phone='142-757-2908',
        street_address='92 olegra lane', city='manhatten', zipcode=75295,
        state='New York', description='Its a Taco Bell, come get your Bean Burrito. The cheese is probably plastic, but you will still eat it.',
        business_type='Restaurant' )
    Gym = Business(
        id=2,
        owner_id=2, business_name='Planet Fitness', phone='131-742-2838',
        street_address='8008 Plant BLVD', city='austin', zipcode=96295,
        state='Texas', description='Pick up heavy things and put them down. That will be $20.99 a month',
        business_type='Personal Improvement' )
    Plumber = Business(
        id=3,
        owner_id=3, business_name='DR.Johns plumbing', phone='862-153-8402',
        street_address='1524 bay dr.', city='Orange County', zipcode=57928,
        state='California', description='Call us when you cant fix it, Our saying is you make em, we take em.',
        business_type='Home Repair')
    db.session.add(TacoBell)
    db.session.add(Gym)
    db.session.add(Plumber)
    db.session.commit()

def undo_businesses():
    # if environment == "production":
    #     db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    # else:
    db.session.execute("DELETE FROM businesses")

    db.session.commit()
