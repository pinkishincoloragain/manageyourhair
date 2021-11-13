'''
1. Download Selenium
    pip install selenium
2. Download ChromeDriver
    2-1. version check
        chrome://version/
    2-2. download file
        https://chromedriver.chromium.org/downloads
3. Download googlemaps
    pip install -U googlemaps
'''

from selenium import webdriver
from bs4 import BeautifulSoup
from time import sleep
import csv
import json
import requests

# Cookie Consent
def consent(driver):
    consentButton = driver.find_element_by_css_selector("form")
    consentButton.click()

# Scroll Down for Crawling all Hair Salons
def scroll_down(driver):
    for i in range(7):  # The number of for loop is depend on the monitor size
        sleep(1)
        scroll = driver.find_element_by_xpath('//*[@id="pane"]/div/div[1]/div/div/div[4]/div[1]')
        driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', scroll)

# Open Google Maps
keyword = 'ireland+hair+salon'
url = 'https://google.com/maps/search/?api=1&query=' + keyword
with open("secrets.json", "r") as f:
    json_data = json.load(f)
key = json_data["GoogleAPIKey"]

driver = webdriver.Chrome('./chromedriver.exe')
driver.maximize_window()
driver.get(url)
consent(driver) # initial cookie consent

# Store Crawling Information
f = open('hair_data.csv', 'w', newline='', encoding='utf-8')
writer = csv.writer(f)
writer.writerow(["Index", "Name", "Address", "latitude", "longtitude", "Phone", "Website", "Ranking", "Open Hours", "Images"])
index = 1

while True:

    scroll_down(driver)
    sleep(10)

    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    detail_list = soup.select('.a4gq8e-aVTXAb-haAclf-jRmmHf-hSRGPd') # To enter detail page
    driver_detail = webdriver.Chrome('./chromedriver.exe')

    for list in detail_list:
        driver_detail.get(list.attrs['href'])
        if index == 1:
            consent(driver_detail) # initial cookie consent
        try:
            name = driver_detail.find_element_by_xpath('//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[1]/div[1]/h1/span[1]').text

        except:
            consent(driver_detail)
            name = driver_detail.find_element_by_xpath('//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[1]/div[1]/h1/span[1]').text
        f2 = open('hair_data.csv', 'r', encoding='utf-8')
        reader = csv.reader(f2)
        for row in reader:
            if name == row[1]:
                continue
        try:
            address = driver_detail.find_element_by_xpath('//*[@id="pane"]/div/div[1]/div/div/div[7]/div[1]/button/div[1]/div[2]/div[1]').text
            api_url = 'https://maps.googleapis.com/maps/api/geocode/json?address={}&key={}'.format(address, key)
            response = requests.get(api_url)
            if response.status_code == 200:
                json_data = response.json()['results'][0]['geometry']['location']
                latitude = json_data['lat']
                longtitude = json_data['lng']
        except:
            address = 'None'
            latitude = 'None'
            longtitude = 'None'
        try:
            phone = driver_detail.find_element_by_xpath('//button[@data-tooltip="Copy phone number"]/div[1]/div[2]/div[1]').text
        except:
            phone = 'None'
        try:
            website = driver_detail.find_element_by_xpath('//button[@data-tooltip="Open website"]/div[1]/div[2]/div[1]').text
        except:
            website = 'None'
        try:
            ranking = driver_detail.find_element_by_xpath('//*[@id="pane"]/div/div[1]/div/div/div[2]/div[1]/div[1]/div[2]/div/div[1]/div[2]/span/span/span').text
        except:
            ranking = 'None'
        try:
            openHours = driver_detail.find_elements_by_xpath('//li[@class="y0skZc-t0oSud-ibnC6b"]')
            openHour_list = []
            for hours in openHours:
                openHour_list.append(hours.get_attribute('textContent'))
        except:
            openHours = 'None'
        try:
            images = driver_detail.find_elements_by_xpath('//*[@id="pane"]/div/div[1]/div/div/div[1]/div[1]/button/img')[0].get_attribute('src')
        except:
            images = 'None'

        writer.writerow([index, name, address, latitude, longtitude, phone, website, ranking, openHour_list, images]) # write CSV file
        index += 1

    driver_detail.close()
    
    # Go to the next page
    try:
        next = driver.find_element_by_xpath('//*[@id="ppdPk-Ej1Yeb-LgbsSe-tJiF1e"]/img') 
        next.click() 
        sleep(2)
    except:
        break

driver.close()