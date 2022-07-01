# Pawssier
**A simpler way to manage your pet's needs.**

![Many animals on white background, royalty free from dreamstime](https://thumbs.dreamstime.com/b/dogs-cats-isolated-different-against-white-background-96932856.jpg)
- - - -
## Table of Contents
* [General Information](#general_info)
* [Pages](#pages)
* [Layout](#layout)
* [Technologies](#technologies)
* [Current Goals](#current-goals)

## General Info
Pawssier is _the all-in-one tool_ for pet parents. Our pet profiles can store vet records, vaccine due dates, visual descriptions, photos, prescriptions, and microchip numbers. These profiles help you stay up to date on vet visits and locate your pets if they get lost.

Pawssier also has information on various pet breeds and diet requirements, courtesy of [Purina](https://www.purina.com/). This information can help you decide if your home is a good fit for a new furry friend. If you think you're ready to expand your family, you can start your adoption search with us too! You can find adoptable animals from [Petfinder](https://www.petfinder.com/) on your dashboard.

## Pages
* Homepage
* Create Account
* Dashboard
* Husbandry Search
* Adoption Search
* Calendar
* Account Profile
* Pet Profile
* Pet Profile Creation
* Bookmarks
* 404

## Layout

- Homepage
    - Explanation of the app, user testimonials, other marketing
    - Log-in form
    - Button for account creation page
        - Form for account creation
- Dashboard
    - Today's calendar events
    - Upcoming events
    - Nav Bar
        - Link to account profile
            - Pets list 
                - Uploaded image, short preview information (upcoming calendar date, microchip number, etc.), acts as link to pet profile
                    - All uploaded images, descriptions, vet records, important dates, microchip numbers, prescription information
                    - Edit/delete saved information
                - Quick link to enter new calendar date (vet visit, shot due, birthday, "gotcha" day)
            - Link to create pet profile
                - Form for pet information entry
        - Link to Calendar
            - Monthly calendar with birthdays, "gotcha" days, vaccine reminders, and vet reminders
        - Husbandry search (Purina)
            - Form fields matching API query requirements
            - Display results on page
            - Option to save results as "bookmark"
        - Adoption search (Petfinder)
            - Form fields matching API query requirements
            - Display results on page
            - Option to save results as "bookmark"
        - 'Bookmarks'
            - Saves query information from Purina/Petfinder for quick return
            - Selection returns to search page

## Technologies
* Angular
    * HTML5, CSS, JavaScript
* Purina API
* Petfinder API

## Current Goals
- Dashboard
- Account Profile
- Pet Profile
    - Form
- Basic CSS