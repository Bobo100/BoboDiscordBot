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

if __name__ == '__main__':
    username = input('請輸入DC帳號') or accuont_data["username"]
    print(username)
    userpassword = input('請輸入DC密碼') or accuont_data["userpassword"]
    print(userpassword)
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
        options.add_argument("--inprivate")
        driver = webdriver.Chrome(
            ChromeDriverManager().install(), options=options)
    else:
        options = webdriver.EdgeOptions()
        if not value:
            options.add_argument("--headless")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        options.add_argument("--inprivate")
        driver = webdriver.Edge(
            EdgeChromiumDriverManager().install(), options=options)

    driver.get(channel_url)
    wait = WebDriverWait(driver, 5)
    # input = wait.until(EC.presence_of_element_located(
    #     (By.CSS_SELECTOR, '#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F')))
    # driver.find_element(By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F").click()
    time.sleep(2)
    driver.find_element(By.CSS_SELECTOR, "#uid_5").send_keys(username)
    driver.find_element(By.CSS_SELECTOR, "#uid_8").send_keys(userpassword)
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > div > form > div.centeringWrapper-dGnJPQ > div > div.mainLoginContainer-wHmAjP > div.block-3uVSn4.marginTop20-2T8ZJx > button.marginBottom8-emkd0_.button-1cRKG6.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeLarge-3mScP9.fullWidth-fJIsjq.grow-2sR_-F").click()
    time.sleep(8)

    while True:

        try:
            pokemon_url = driver.find_elements(
                By.CLASS_NAME, 'originalLink-Azwuo9')[-1].get_attribute('href')

            # driver.execute_script("window.scrollTo(0, document.body.scrollHeightY)")

            base = driver.find_elements(
                By.XPATH, "//a[contains(@class, 'originalLink-Azwuo9')]")

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
                    # 需要的才抓
                    if pokemon_number in want_catch_data or "shiny" in pokemon_url:
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
                        button_click = driver.find_element(
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

                    #     print("一般寶可夢：" + chinese_name)
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

                time.sleep(2)
        except:
            pass
        time.sleep(3)
        # message-accessories-1049706060686033026 > div > div > div > button
