import re
import json

def sanitize_menu(menu: str):
    if menu == None:
        return ""
    return menu.rstrip("0123456789 ")

class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj, "__dict__"):
            return obj.__dict__
        else:
            return json.JSONEncoder.default(self, obj)