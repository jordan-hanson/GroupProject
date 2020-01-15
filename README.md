# My Coffee Finder

## Overview
The purpose of this application is to find your local coffee shops near you.

It is mid afternoon and you hit your five o'clock downer. You grab for your phone wanting to know where you can find your closest coffee shop! This is where our app comes in. You now have coffee at your finger tips. Coffee is now only one click away from directions and the five closest shops to your current location. 

### Gallery
Home:
![User Interface](assets/images/CoffeeFinderSC.png"Coffee Finder")
Mobile View:
![Mobile Page View](assets/images/MobileCF.png"Mobile Page View")
### Problem
We don't know how to find coffee when it is needed.
### Solution
My solution will solve the need to find coffee. We created an app to find the closest coffee shops based on location.
## Tech and Features Used
* Materialize
* Javascript
* MapQuest API
* ARCGIS Map API
## How to use
Instrunctions:
Step one: Open up your app.
Step Two: Accept Location or type in Zipcode in input field.
Step Three: Click on populated locations for directions on the rendered map.
## Technical Overview

1. The main component is navigator geolocation to get the current location.
2. That component is to get the current latitude and longtitude for location and we built the query URL based upon those parameters.
3. The AJAX call returns the basic information: Name and Location. It then builds out five cards of the nearest coffee shops.
4. The five cards are a click able component activates the reverse geolocation and that AJAX call returns the directions to the coffee shop displayed on then map. 
5. The search code zip button is an open data soft API. We create a URL using open dfata soft API. We take the zipcode typed in and returns a latitude and longtitude that is used to build a query URL with our ARCGIS call that creates five 'new' cards with the five closest coffee shops to that zipcode. 
6. We then call the MapQuest API from #3 to give us directions to the new coffee shop the user selected.

Link to example readme:
https://github.com/jordan-hanson/GroupProject