from app.models import db, Review, environment, SCHEMA


def seed_reviews():
    Review1 = Review(
        stars=1, review='When i lifted the weights too many times, I ended up LOSING STRENGTH!!! What a scam. At the end i could barly lift my arms.',
        business_id=2, user_id=3
    )
    Review2 = Review(
        stars=5, review='They were right. my stomach feels terrible after the cheese. But i still will continue to scarf that delicious plastic down every time.',
        business_id=1, user_id=3
    )
    Review3 = Review(
        stars=1, review='They undercooked my food. I am very ill',
        business_id=1, user_id=2
    )

    db.session.add(Review1)
    db.session.add(Review2)
    db.session.add(Review3)

    db.session.commit()
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
