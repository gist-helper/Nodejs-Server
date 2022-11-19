import openpyxl
import codecs
import json

from meal import MealWrapper

from utils import ComplexEncoder, sanitize_menu

# 1학생회관 1층 : 11월3째주메뉴.xlsx
# 1학생회관 2층 : 주간식단표(2022년11월21일~2022년11월25일식단표).xlsx
# 2학생회관 1층 : 11월3주.xlsx
excel_path = "./2학생회관.xlsx"

wb = openpyxl.load_workbook(excel_path)
sh = wb.worksheets[0]

for j in range(3):
    jsonFile = open(f"./{j}.json", 'w+',encoding='utf-8')

    breakfast = MealWrapper()
    
    breakfast.meal.title="제2학생회관1층"

    mealDate = sh.cell(row=2, column=4).value
    
    breakfast.meal.meal_date = mealDate.strftime('%Y-%m-%d')
    #breakfast.meal.meal_date="2015-03-14"
    
    breakfast.meal.kind_of_meal = "조식"
    
    menus = ""

    for k in range(3, 13):
        menus += sanitize_menu((sh.cell(row=k, column=4).value)) + '\n'
    #breakfast.meal.menu="콩밥"

    breakfast.meal.menu=menus

    json.dump(breakfast.__dict__,jsonFile,indent=4,ensure_ascii=False,cls=ComplexEncoder)