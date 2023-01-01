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

import threading

base_path = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(os.path.abspath(base_path + "/../"), "data")
want_catch_path = os.path.join(data_path, "want_catch.json")
pokemon_dataset_path = os.path.join(data_path, "pokemon_dataset.json")

# Opening JSON file
f = open(pokemon_dataset_path, encoding="utf-8")
data = json.load(f)
f.close()

f = open(want_catch_path, encoding="utf-8")
want_catch_data = json.load(f)
f.close()

f = open(os.path.join(base_path, "data", "account_data.json"), encoding="utf-8")
accuont_data = json.load(f)
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
    while True:
        try:
            # pokemon_url = driver.find_elements(
            #     By.CLASS_NAME, 'originalLink-Azwuo9')[-1].get_attribute('href')
            # driver.execute_script("window.scrollTo(0, document.body.scrollHeightY)")

            # base = driver.find_elements(
            #     By.XPATH, "//article/div/div/div/div/div/a[contains(@class, 'originalLink-Azwuo9')]")

            base = driver.find_elements(
                By.XPATH, './/article/div/div/div[contains(concat(" ",normalize-space(@class)," ")," imageContent-3Av-9c ")][contains(concat(" ",normalize-space(@class)," ")," embedThumbnail-2nTasl ")]/div/div/a[contains(@class, "originalLink-Azwuo9")]')
            
            # lsat = driver.find_elements(By.XPATH, '//*[@id="app-mount"]/div[2]/div/div[1]/div/div[2]/div/div[1]/div/div[2]/div[3]/div/main/div[1]/div[2]/div/ol/li')
            # driver.execute_script(
            #         "arguments[0].scrollIntoView(true);", lsat[-1])
            
            if(time_count >= 3000):
                time_count = 0
                driver.navigate().refresh()
            
            for temp in range(-1, -3, -1):
                pokemon_url = base[temp].get_attribute('href')
                pokemon_number = pokemon_url.split('/')[-1].split('-')[0]
                pokemon_number_region = pokemon_url.split(
                    '/')[-1].split('-')[1]
                # print(pokemon_number + "-" + pokemon_number_region)

                driver.execute_script(
                    "arguments[0].scrollIntoView(true);", base[temp])

                # print(pokemon_url)

                article_id = base[temp].find_element(
                    By.XPATH, "../../../../../../..").get_attribute("id")
                if article_id:

                    if "xmas2022" in pokemon_url:
                        if pokemon_number_region != "0":
                            pokemon_number = pokemon_number + "-" + pokemon_number_region

                        for i in data:
                            if (i["id"] == pokemon_number):
                                pokemon_name = i["name"]
                                chinese_name = i["chinese_name"]
                        print("聖誕寶可夢，戰鬥啦" + chinese_name)
                        # 按下join
                        article_selector = "#" + article_id + " > div > div > div > button"
                        driver.find_element(
                            By.CSS_SELECTOR,  article_selector).click()

                        # 找正確的技能名稱
                        keyword = ""
                        keyword = switch(pokemon_name)
                        print("請使用:" + keyword)
                        # 文字1
                        # #message-accessories-1056172557881065493 > div.container-3Sqbyb > div > div > button:nth-child(1) > div > div > div

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
                            # button = './/*[@id="'+article_id + \
                            # '"]/div[contains(concat(" ",normalize-space(@class)," ")," container-3Sqbyb ")]/div/div/button[(count(preceding-sibling::*)+1) = 1]'
                            # button = "#" + article_id + \
                            #     " > div.container-3Sqbyb > div > div > button:nth-child(1)"

                            # //*[@id="message-accessories-1056230737755504691"]/div/div/div/button[2]
                            button = './/*[@id="'+article_id + \
                                '"]/div/div/div/button[1]'
                            print("使用第一招")
                        elif (keyword in text2):
                            # button = './/*[@id="'+article_id + \
                            #     '"]/div[contains(concat(" ",normalize-space(@class)," ")," container-3Sqbyb ")]/div/div/button[(count(preceding-sibling::*)+1) = 1]'
                            # button = "#" + article_id + \
                            #     " > div.container-3Sqbyb > div > div > button:nth-child(2)"
                            button = './/*[@id="'+article_id + \
                                '"]/div/div/div/button[2]'
                            print("使用第二招")
                        elif (keyword in text3):
                            # button = './/*[@id="'+article_id + \
                            #     '"]/div[contains(concat(" ",normalize-space(@class)," ")," container-3Sqbyb ")]/div/div/button[(count(preceding-sibling::*)+1) = 1]'
                            # button = "#" + article_id + \
                            #     " > div.container-3Sqbyb > div > div > button:nth-child(3)"
                            button = './/*[@id="'+article_id + \
                                '"]/div/div/div/button[3]'
                            print("使用第三招")
                        elif (keyword in text4):
                            # button = './/*[@id="'+article_id + \
                            #     '"]/div[contains(concat(" ",normalize-space(@class)," ")," container-3Sqbyb ")]/div/div/button[(count(preceding-sibling::*)+1) = 1]'
                            # button = "#" + article_id + \
                            #     " > div.container-3Sqbyb > div > div > button:nth-child(4)"
                            button = './/*[@id="'+article_id + \
                                '"]/div/div/div/button[4]'
                            print("使用第四招")

                        driver.find_element(
                            By.XPATH,  button).click()

                        # text1 = "#" + article_id + \
                        #     " > div.container-3Sqbyb > div > div > button:nth-child(1) > div > div > div"
                        # text2 = "#" + article_id + \
                        #     " > div.container-3Sqbyb > div > div > button:nth-child(2) > div > div > div"
                        # text3 = "#" + article_id + \
                        #     " > div.container-3Sqbyb > div > div > button:nth-child(3) > div > div > div"
                        # text4 = "#" + article_id + \
                        #     " > div.container-3Sqbyb > div > div > button:nth-child(4) > div > div > div"

                    # 需要的才抓
                    elif pokemon_number in want_catch_data or "shiny" in pokemon_url and not "xmas2022" in pokemon_url:
                        # if True:
                        # find pokemon name
                        if pokemon_number_region != "0":
                            pokemon_number = pokemon_number + "-" + pokemon_number_region

                        for i in data:
                            if (i["id"] == pokemon_number):
                                pokemon_name = i["name"]
                                chinese_name = i["chinese_name"]

                        print("重要寶可夢：" + chinese_name)
                        # print(article_id)
                        article_selector = "#" + article_id + " > div > div > div > button"

                        driver.find_element(
                            By.CSS_SELECTOR,  article_selector).click()
                        time.sleep(2)
                        # 輸入名字
                        input = wait.until(EC.presence_of_element_located(
                            (By.CSS_SELECTOR, '#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input')))
                        # input = driver.find_element(
                        #     By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input")
                        input.send_keys(pokemon_name)
                        # # 確認抓取
                        wait.until(EC.presence_of_element_located(
                            (By.CSS_SELECTOR, '#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F')))
                        button_name_click = driver.find_element(
                            By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F").click()
                    # else:
                    #     if pokemon_number_region != "0":
                    #         pokemon_number = pokemon_number + "-" + pokemon_number_region

                    #     for i in data:
                    #         if (i["id"] == pokemon_number):
                    #             pokemon_name = i["name"]
                    #             chinese_name = i["chinese_name"]

                    #     # print("一般寶可夢：" + chinese_name)
                    #     # print(article_id)
                    #     article_selector = "#" + article_id + " > div > div > div > button"
                    #     button_click = driver.find_element(
                    #         By.CSS_SELECTOR,  article_selector).click()
                    #     time.sleep(2)
                    #     # 輸入名字
                    #     input = wait.until(EC.presence_of_element_located(
                    #         (By.CSS_SELECTOR, '#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input')))
                    #     # input = driver.find_element(
                    #     #     By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input")
                    #     input.send_keys(pokemon_name)
                    #     # # 確認抓取
                    #     wait.until(EC.presence_of_element_located(
                    #         (By.CSS_SELECTOR, '#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F')))
                    #     button_name_click = driver.find_element(
                    #         By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F").click()

        except Exception as e:
            time_count+=1
            time.sleep(3)
            pass
        


if __name__ == '__main__':
    username = input('請輸入DC帳號') or accuont_data["username"]
    print(username)
    userpassword = input('請輸入DC密碼') or accuont_data["userpassword"]
    print(userpassword)
    otp = click.confirm('你有OTP嗎', default=False)
    print(otp)
    broswer_value = click.confirm('你使用的瀏覽器(Chrome請選Y，Edge選N)', default=False)
    print(broswer_value)
    value = click.confirm('要開啟瀏覽器嗎', default=True)
    print(value)
    channel_url = input(
        '要抓取頻道的網址') or accuont_data["channel_url"]
    print(channel_url)

    if (broswer_value):
        options = webdriver.ChromeOptions()
        if not value:
            options.add_argument("--headless")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        # options.add_argument("--inprivate")
        driver = webdriver.Chrome(
            ChromeDriverManager().install(), options=options)
    else:
        options = webdriver.EdgeOptions()
        if not value:
            options.add_argument("--headless")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        # options.add_argument("--inprivate")
        options.add_argument(
            "user-data-dir=C:\\Users\\w150l\\AppData\\Local\\Microsoft\\Edge\\User Data1")
        driver = webdriver.Edge(
            EdgeChromiumDriverManager().install(), options=options)

    driver.get(channel_url)
    wait = WebDriverWait(driver, 20)

    if (not os.path.isdir("C:\\Users\\w150l\\AppData\\Local\\Microsoft\\Edge\\User Data1")):
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
    # threading.Thread(target = catch(driver), name = '執行敘明稱', args = variable).start
    # driver.switch_to.new_window('tab')

    # 開啟第二個分頁
    # catch(driver)

    # while otp:
    #     try:
    #         otpvalue = input('請輸入otp')
    #     except:
    #         print("???")

    #     input = wait.until(EC.presence_of_element_located(
    #         (By.XPATH, "//input[contains(@class, 'inputDefault-3FGxgL')]")))
    #     driver.find_element(
    #         By.XPATH,  "//input[contains(@class, 'inputDefault-3FGxgL')]").send_keys(otpvalue)

    #     aria_label = driver.find_element(
    #         By.XPATH,  "//input[contains(@class, 'inputDefault-3FGxgL')]").get_attribute("aria-label")

    #     driver.find_element(
    #         By.XPATH, "//*[@id='app-mount']/div[2]/div/div[1]/div/div/div/form/div[2]/div[2]/button[1]").click()

    #     if driver.find_element(By.XPATH, "//*[@id = '" + aria_label + "']/span/text()").text in "Invalid two-factor":
    #         # 沒通過認證
    #         otp = True
    #     else:
    #         otp = False

    # "//*[@id = '" + aria_label + "']/span/text()"

    # while True:
    #     try:
    #         pokemon_url = driver.find_elements(
    #             By.CLASS_NAME, 'originalLink-Azwuo9')[-1].get_attribute('href')

    #         # driver.execute_script("window.scrollTo(0, document.body.scrollHeightY)")

    #         base = driver.find_elements(
    #             By.XPATH, "//a[contains(@class, 'originalLink-Azwuo9')]")

    #         for temp in range(-1, -3, -1):
    #             pokemon_url = base[temp].get_attribute('href')
    #             pokemon_number = pokemon_url.split('/')[-1].split('-')[0]
    #             pokemon_number_region = pokemon_url.split(
    #                 '/')[-1].split('-')[1]
    #             # print(pokemon_number + "-" + pokemon_number_region)

    #             driver.execute_script(
    #                 "arguments[0].scrollIntoView(true);", base[temp])

    #             # print(pokemon_url)

    #             article_id = base[temp].find_element(
    #                 By.XPATH, "../../../../../../..").get_attribute("id")
    #             if article_id:
    #                 # 需要的才抓
    #                 if pokemon_number in want_catch_data or "shiny" in pokemon_url:
    #                     # if True:
    #                     # find pokemon name
    #                     if pokemon_number_region != "0":
    #                         pokemon_number = pokemon_number + "-" + pokemon_number_region

    #                     for i in data:
    #                         if (i["id"] == pokemon_number):
    #                             pokemon_name = i["name"]
    #                             chinese_name = i["chinese_name"]

    #                     print("重要寶可夢：" + chinese_name)
    #                     # print(article_id)
    #                     article_selector = "#" + article_id + " > div > div > div > button"
    #                     button_click = driver.find_element(
    #                         By.CSS_SELECTOR,  article_selector).click()
    #                     time.sleep(2)
    #                     # 輸入名字
    #                     input = wait.until(EC.presence_of_element_located(
    #                         (By.CSS_SELECTOR, '#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input')))
    #                     # input = driver.find_element(
    #                     #     By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input")
    #                     input.send_keys(pokemon_name)
    #                     # # 確認抓取
    #                     wait.until(EC.presence_of_element_located(
    #                         (By.CSS_SELECTOR, '#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F')))
    #                     button_name_click = driver.find_element(
    #                         By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F").click()
    #                 # else:
    #                 #     if pokemon_number_region != "0":
    #                 #         pokemon_number = pokemon_number + "-" + pokemon_number_region

    #                 #     for i in data:
    #                 #         if (i["id"] == pokemon_number):
    #                 #             pokemon_name = i["name"]
    #                 #             chinese_name = i["chinese_name"]

    #                 #     print("一般寶可夢：" + chinese_name)
    #                 #     # print(article_id)
    #                 #     article_selector = "#" + article_id + " > div > div > div > button"
    #                 #     button_click = driver.find_element(
    #                 #         By.CSS_SELECTOR,  article_selector).click()
    #                 #     time.sleep(2)
    #                 #     # 輸入名字
    #                 #     input = wait.until(EC.presence_of_element_located(
    #                 #         (By.CSS_SELECTOR, '#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input')))
    #                 #     # input = driver.find_element(
    #                 #     #     By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.content-2hZxGK.thin-31rlnD.scrollerBase-_bVAAt > div:nth-child(2) > div > div > div > div > input")
    #                 #     input.send_keys(pokemon_name)
    #                 #     # # 確認抓取
    #                 #     wait.until(EC.presence_of_element_located(
    #                 #         (By.CSS_SELECTOR, '#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F')))
    #                 #     button_name_click = driver.find_element(
    #                 #         By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div:nth-child(3) > div.layer-1Ixpg3 > div > div > div.flex-2S1XBF.flex-3BkGQD.horizontalReverse-60Katr.horizontalReverse-2QssvL.flex-3BkGQD.directionRowReverse-HZatnx.justifyStart-2Mwniq.alignStretch-Uwowzr.noWrap-hBpHBz.footer-31IekZ.footerSeparator-VzAYwb > button.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeMedium-2bFIHr.grow-2sR_-F").click()
    #     except:
    #         pass
    #     time.sleep(3)
    #     # message-accessories-1049706060686033026 > div > div > div > button
