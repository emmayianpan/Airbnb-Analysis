from bs4 import BeautifulSoup
import requests 

def scrap():
    airbnb_scrap = {}
    #airbnb 
    airbnb_url = requests.get('https://news.airbnb.com/').text
    airbnb_soup = BeautifulSoup(airbnb_url, 'lxml')
    airbnb_article = airbnb_soup.find('article')
    airbnb_headline = airbnb_article.h3.a.text #How Airbnb and Travelers are Redefining Travel in 2021
    airbnb_link = airbnb_article.h3.a['href'] #https://news.airbnb.com/2021-travel-trends/
    airbnb_summary = airbnb_article.find('div', class_='postTeaser__entrySummary').text #From taking life to the road, to consciously and safely reconnecting with the places and people that matter most, Airbnb and travelers predict what travel will look like in 2021.
    airbnb_img = airbnb_article.find('img')['src'] #https://news.airbnb.com/wp-content/uploads/sites/4/2020/10/Airbnb-TravelTrends2021-Header.jpg

    #bbc
    bbc_url = requests.get('https://www.bbc.com/news/topics/cny6mxpgnk5t/airbnb').text
    bbc_soup = BeautifulSoup(bbc_url, 'lxml')
    bbc_article = bbc_soup.find('article')
    bbc_header = bbc_article.find('header')
    bbc_headline = bbc_header.find('span').text #Airbnb blocks US Halloween bookings over party fears
    bbc_scarp_link = bbc_header.h3.a['href'] #/news/technology-54395664
    bbc_summary = bbc_article.find('div', class_='gel-5/8@l').text #The company wants to crack down on house parties after concerns of a second Covid wave.Read morenext
    bbc_img = bbc_article.find('img')['src'] #https://ichef.bbci.co.uk/live-experience/cps/320/cpsprodpb/9FDB/production/_114732904_90728edc-0dee-4c27-8b26-1eb687f6ef6e.jpg
    bbc_link = f'https://www.bbc.com{bbc_scarp_link}'

    #abc
    abc_url = requests.get('https://abcnews.go.com/alerts/airbnb').text
    abc_soup = BeautifulSoup(abc_url, 'lxml')
    abc_article = abc_soup.find('section', class_='ContentRoll')
    abc_headline = abc_article.h2.a.text #Airbnb CEO says more people want to travel amidst the pandemic
    abc_link = abc_article.h2.a['href'] #https://www.goodmorningamerica.com/travel/video/airbnb-ceo-people-travel-amidst-pandemic-71198399
    abc_summary = abc_article.find('div', class_='ContentRoll__Desc').text #Brian Chesky, CEO of Airbnb, discusses how travel is starting to recover from a virtual standstill and there is a nearby travel season approaching.
    abc_img = abc_article.find('img')['src']

    airbnb_scrap = {
        #airbnb
        "airbnb_headline": airbnb_headline,
        "airbnb_link": airbnb_link,
        "airbnb_summary" : airbnb_summary, 
        "airbnb_img": airbnb_img, 

        #bbc
        "bbc_headline": bbc_headline,
        "bbc_link": bbc_link, 
        "bbc_summary": bbc_summary, 
        "bbc_img": bbc_img, 

        #abc
        "abc_headline": abc_headline, 
        "abc_link": abc_link, 
        "abc_summary": abc_summary, 
        "abc_img": abc_img
    }
    return airbnb_scrap