import re
import json

def sanitize_menu(menu: str):
    if menu == None:
        return ""
    return re.sub(r"[0-9]","",menu).rstrip()

class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj, "__dict__"):
            return obj.__dict__
        else:
            return json.JSONEncoder.default(self, obj)