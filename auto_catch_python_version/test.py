
import os
import json
base_path = os.path.dirname(os.path.abspath(__file__))
f = open(os.path.join(base_path, "data", "account_data.json"), encoding="utf-8")
accuont_data = json.load(f)
f.close()


print(accuont_data["username"])