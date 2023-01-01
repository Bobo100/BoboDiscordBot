
# import os
# import json
# base_path = os.path.dirname(os.path.abspath(__file__))
# f = open(os.path.join(base_path, "data", "account_data.json"), encoding="utf-8")
# accuont_data = json.load(f)
# f.close()


# print(accuont_data["username"])

# from selenium import webdriver
# import time
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.common.by import By

# from selenium import webdriver
# from webdriver_manager.chrome import ChromeDriverManager
# from webdriver_manager.microsoft import EdgeChromiumDriverManager
# from selenium.webdriver.support.wait import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC

import os

if __name__ == '__main__':
    # options = webdriver.EdgeOptions()
    # options.add_experimental_option('excludeSwitches', ['enable-logging'])
    # options.add_argument("--inprivate")
    # driver = webdriver.Edge(
    #     EdgeChromiumDriverManager().install(), options=options)
    # # time.sleep(100000)
    
    # driver.switch_to.new_window('tab')

# driver.get(channel_url)

    broswer_origin_path = "C:\\Users\\" + os.getlogin() + "\\AppData\\Local\\Microsoft\\Edge\\User Data"
    broswer_copy_folder_path = "C:\\Users\\" + os.getlogin() + "\\AppData\\Local\\Microsoft\\Edge\\User Data1"
    
    broswer_copy_path = "user-data-dir=C:\\Users\\" + os.getlogin() + "\\AppData\\Local\\Microsoft\\Edge\\User Data1"
    
    if(os.path.isdir(broswer_copy_folder_path)):
        print("true")
    print(os.getlogin())
