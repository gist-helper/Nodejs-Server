class Meal:
    title: str
    meal_date: str
    kind_of_meal: str
    menu: str

class MealWrapper:
    meal: Meal

    def __init__(self) -> None:
        self.meal = Meal()

kind_of_restaurants = ["제1학생회관1층","제1학생회관2층","제2학생회관1층"]
kind_of_meals = ["조식","중식","삭식"]

slot_endpoints = [(3,12),(13,22),(23,20)]
slot_filenames_postfix = ['_b_kor.json','_l_kor.json','_d_kor.json']