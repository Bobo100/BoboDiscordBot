from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import click
import os
import json

import shutil


base_path = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(os.path.abspath(base_path + "/../"), "data")
pokemon_dataset_path = os.path.join(data_path, "pokemon_dataset.json")

# Opening JSON file
f = open(pokemon_dataset_path, encoding="utf-8")
data = json.load(f)
f.close()


def switch(lang):
    if lang == "Doduo":
        return "Icy Wind"
    elif lang == "Galarian Zapdos":
        return "Moonblast"
    elif lang == "Dragonite":
        return "Freeze Dry"
    elif lang == "Shuckle":
        return "Iron Head"
    elif lang == "Slugma":
        return "Water Shuriken"
    elif lang == "Ho-Oh":
        return "Thunder"
    elif lang == "Spinda":
        return "Close Combat"
    elif lang == "Bergmite":
        return "Stone Edge"
    elif lang == "Xerneas":
        return "Sludge Wave"
    elif lang == "Rockruff":
        return "Flash Cannon"


def catch(driver):
    time_count = 0
    id_list = []
    while True:
        try:
            base = driver.find_elements(
                By.XPATH, './/article/div/div/div[contains(concat(" ",normalize-space(@class)," ")," imageContent-3Av-9c ")][contains(concat(" ",normalize-space(@class)," ")," embedThumbnail-2nTasl ")]/div/div/a[contains(@class, "originalLink-Azwuo9")]')

            if (time_count >= 25):                
                lastbutton = driver.find_elements(By.XPATH, '//*[@id="app-mount"]/div/div/div/div/div/div/div/div/div/div/div/main/div/div/div/ol/li')
                driver.execute_script(
                    "arguments[0].scrollIntoView(true);", lastbutton[-1])
                # print("refresh")
                id_list.clear()
                time_count = 0
                
            time_count += 1

            for temp in range(-1, -3, -1):
                pokemon_url = base[temp].get_attribute('href')
                pokemon_number = pokemon_url.split('/')[-1].split('-')[0]
                pokemon_number_region = pokemon_url.split(
                    '/')[-1].split('-')[1]
                
                article_id = base[temp].find_element(
                    By.XPATH, "../../../../../../..").get_attribute("id")
                if article_id:
                    if article_id in id_list:
                        time_count-=1
                        continue

                    if "xmas2022" in pokemon_url:
                        if pokemon_number_region != "0":
                            pokemon_number = pokemon_number + "-" + pokemon_number_region

                        for i in data:
                            if (i["id"] == pokemon_number):
                                pokemon_name = i["name"]
                                chinese_name = i["chinese_name"]
                        print(f'快來和 {chinese_name} + 聖誕寶可夢，戰鬥啦')
                        # 按下join
                        article_selector = ".//*[@id='" + article_id + "']/div/div/div/button"
                        driver.find_element(
                            By.XPATH,  article_selector).click()

                        # 找正確的技能名稱
                        keyword = ""
                        keyword = switch(pokemon_name)
                        print("請使用:" + keyword)
                        # 文字1
                        time.sleep(10)

                        text1_xpath = './/*[@id="'+article_id + \
                            '"]/div[contains(concat(" ",normalize-space(@class)," ")," container-3Sqbyb ")]/div/div/button[(count(preceding-sibling::*)+1) = 1]/div/div/div'
                        text2_xpath = './/*[@id="'+article_id + \
                            '"]/div[contains(concat(" ",normalize-space(@class)," ")," container-3Sqbyb ")]/div/div/button[(count(preceding-sibling::*)+1) = 2]/div/div/div'
                        text3_xpath = './/*[@id="'+article_id + \
                            '"]/div[contains(concat(" ",normalize-space(@class)," ")," container-3Sqbyb ")]/div/div/button[(count(preceding-sibling::*)+1) = 3]/div/div/div'
                        text4_xpath = './/*[@id="'+article_id + \
                            '"]/div[contains(concat(" ",normalize-space(@class)," ")," container-3Sqbyb ")]/div/div/button[(count(preceding-sibling::*)+1) = 4]/div/div/div'

                        wait.until(EC.presence_of_element_located(
                            (By.XPATH, text2_xpath)))

                        text1 = driver.find_element(
                            By.XPATH, text1_xpath).get_attribute("innerText")
                        text2 = driver.find_element(
                            By.XPATH, text2_xpath).get_attribute("innerText")
                        text3 = driver.find_element(
                            By.XPATH, text3_xpath).get_attribute("innerText")
                        text4 = driver.find_element(
                            By.XPATH, text4_xpath).get_attribute("innerText")

                        if (keyword in text1):
                            button = './/*[@id="'+article_id + \
                                '"]/div/div/div/button[1]'
                            print("使用第一招")
                        elif (keyword in text2):
                            button = './/*[@id="'+article_id + \
                                '"]/div/div/div/button[2]'
                            print("使用第二招")
                        elif (keyword in text3):
                            button = './/*[@id="'+article_id + \
                                '"]/div/div/div/button[3]'
                            print("使用第三招")
                        elif (keyword in text4):
                            button = './/*[@id="'+article_id + \
                                '"]/div/div/div/button[4]'
                            print("使用第四招")

                        driver.find_element(
                            By.XPATH,  button).click()
                        
                        id_list.append(article_id)
        except Exception as e:
            time_count += 1
            time.sleep(2)
            pass


if __name__ == '__main__':
    
    if(not os.path.isdir(os.path.join(base_path, "data"))):
        os.mkdir(os.path.join(base_path, "data"))

    if (os.path.exists(os.path.join(base_path, "data", "account_data.json"))):
        f = open(os.path.join(base_path, "data",
                 "account_data.json"), encoding="utf-8")
        accuont_data = json.load(f)
        f.close()
    else:
        print("第一次使用")
        username = input('請輸入DC帳號')
        print(username)
        userpassword = input('請輸入DC密碼')
        print(userpassword)
        channel_url = input(
            '要抓取頻道的網址')
        print(channel_url)

        accuont_data = {
            "username": username,
            "userpassword": userpassword,
            "channel_url": channel_url
        }
        with open(os.path.join(base_path, "data", "account_data.json"), "w") as outfile:
            json.dump(accuont_data, outfile)

    username = input('請輸入DC帳號') or accuont_data["username"]
    print(username)
    userpassword = input('請輸入DC密碼') or accuont_data["userpassword"]
    print(userpassword)    
   
    value = click.confirm('要開啟瀏覽器嗎', default=True)
    print(value)
    channel_url = input(
        '要抓取頻道的網址') or accuont_data["channel_url"]
    print(channel_url)

    broswer_origin_path = "C:\\Users\\" + os.getlogin() + "\\AppData\\Local\\Microsoft\\Edge\\User Data"
    broswer_copy_folder_path = "C:\\Users\\" + os.getlogin() + "\\AppData\\Local\\Microsoft\\Edge\\User Data1"
    
    broswer_copy_path = "user-data-dir=C:\\Users\\" + os.getlogin() + "\\AppData\\Local\\Microsoft\\Edge\\User Data1"
    
    if(not os.path.isdir(broswer_copy_folder_path)):
        shutil.copytree(broswer_origin_path, broswer_copy_folder_path)

    
    options = webdriver.EdgeOptions()
    if not value:
        options.add_argument("--headless")
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    options.add_argument(
        broswer_copy_path)
    driver = webdriver.Edge(
        EdgeChromiumDriverManager().install(), options=options)

    driver.get(channel_url)
    wait = WebDriverWait(driver, 20)
    
    if (not os.path.isdir(broswer_copy_folder_path)):
        input = wait.until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, '#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F')))
        driver.find_element(By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F").click()

        time.sleep(2)
        driver.find_element(By.CSS_SELECTOR, "#uid_5").send_keys(username)
        driver.find_element(By.CSS_SELECTOR, "#uid_8").send_keys(userpassword)
        time.sleep(1)
        driver.find_element(By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > div > form > div.centeringWrapper-dGnJPQ > div > div.mainLoginContainer-wHmAjP > div.block-3uVSn4.marginTop20-2T8ZJx > button.marginBottom8-emkd0_.button-1cRKG6.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeLarge-3mScP9.fullWidth-fJIsjq.grow-2sR_-F").click()
        time.sleep(8)

    catch(driver)
