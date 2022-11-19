class Meal:
    title: str
    meal_date: str
    kind_of_meal: str
    menu: str

class MealWrapper:
    meal: Meal

    def __init__(self) -> None:
        self.meal = Meal()