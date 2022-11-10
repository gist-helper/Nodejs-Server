import json

class meals:
    title: str
    meal_date: str
    kind_of_meal: str
    menu: str

breakfast = meals()

breakfast.title="제2학생회관1층"
breakfast.meal_date="2015-03-14"
breakfast.kind_of_meal = "조식"
breakfast.menu="콩밥"

print(json.dumps(breakfast.__dict__,ensure_ascii=False))