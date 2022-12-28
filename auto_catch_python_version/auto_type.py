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
import string
import random
import json


def random_char(y):
    return ''.join(random.choice(string.ascii_letters) for x in range(y))


if __name__ == '__main__':
    base_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_path, "data",
                             "account_data.json")
    if os.path.exists(file_path):
        f = open(file_path, encoding="utf-8")
        accuont_data = json.load(f)
        f.close()
    else:
        with open(file_path, 'w', encoding='utf-8') as f:
            accuont_data = {
                "username": "your dc account",
                "userpassword": "your dc password",
                "channel_url": "https://your_channel.com"
            }
            json.dump(accuont_data, f)

    username = input('請輸入DC帳號') or accuont_data["username"]
    print(username)
    userpassword = input('請輸入DC密碼') or accuont_data["userpassword"]
    print(userpassword)
    broswer_value = click.confirm('你使用的瀏覽器(Chrome請選Y，Edge選N)', default=False)
    print(broswer_value)
    value = click.confirm('要開啟瀏覽器嗎', default=True)
    print(value)
    channel_url = input(
        '要刷頻道的網址') or accuont_data["channel_url"]
    print(channel_url)

    if (broswer_value):
        options = webdriver.ChromeOptions()
        if not value:
            options.add_argument("--headless")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        driver = webdriver.Chrome(
            ChromeDriverManager().install(), options=options)
    else:
        options = webdriver.EdgeOptions()
        if not value:
            options.add_argument("--headless")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        driver = webdriver.Edge(
            EdgeChromiumDriverManager().install(), options=options)

    time.sleep(2)
    try:
        driver.get(channel_url)
    except:
        print("頻道網址不正確")
        exit()
    # time.sleep(3)
    # driver.find_element(By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > section > div.centeringWrapper-dGnJPQ > button.marginTop8-24uXGp.marginCenterHorz-574Oxy.linkButton-2ax8wP.button-f2h6uQ.lookLink-15mFoz.lowSaturationUnderline-Z6CW6z.colorLink-1Md3RZ.sizeMin-DfpWCE.grow-2sR_-F").click()
    time.sleep(2)
    driver.find_element(By.CSS_SELECTOR, "#uid_5").send_keys(username)
    driver.find_element(By.CSS_SELECTOR, "#uid_8").send_keys(userpassword)
    time.sleep(1)
    driver.find_element(By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div > div > div > form > div.centeringWrapper-dGnJPQ > div > div.mainLoginContainer-wHmAjP > div.block-3uVSn4.marginTop20-2T8ZJx > button.marginBottom8-emkd0_.button-1cRKG6.button-f2h6uQ.lookFilled-yCfaCM.colorBrand-I6CyqQ.sizeLarge-3mScP9.fullWidth-fJIsjq.grow-2sR_-F").click()
    time.sleep(8)
    
    
    smallest = 5
    largest = 20
    while True:
        try:
            wait = WebDriverWait(driver, 10)
            element = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div.container-1eFtFS > div > div > div.chat-2ZfjoI > div.content-1jQy2l > main > form > div.channelTextArea-1FufC0.channelTextArea-1VQBuV > div.scrollableContainer-15eg7h.webkit-QgSAqd > div > div.textArea-2CLwUE.textAreaSlate-9-y-k2.slateContainer-3x9zil > div > div > div')))
            # input = driver.find_element(By.CSS_SELECTOR,  "#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div.container-1eFtFS > div > div > div.chat-2ZfjoI > div.content-1jQy2l > main > form > div.channelTextArea-1FufC0.channelTextArea-1VQBuV > div.scrollableContainer-15eg7h.webkit-QgSAqd > div > div.textArea-2CLwUE.textAreaSlate-9-y-k2.slateContainer-3x9zil > div > div > div")
            test = random_char(random.randint(smallest, largest - 1))
            print(test)
            element.send_keys(test)
            element.send_keys(Keys.RETURN)
        except KeyboardInterrupt:
            exit()
        time.sleep(2)
