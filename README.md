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
### :heavy_check_mark: indicates a functional page

* Homepage
* Create Account
* Dashboard
* Husbandry Search
* Adoption Search :heavy_check_mark:
* Bookmarks
* Calendar :heavy_check_mark:
* Account Profile :heavy_check_mark:
* Account Pets :heavy_check_mark:
* Create Pet Profile :heavy_check_mark:
* Edit Pet Profile :heavy_check_mark:
* View Pet Profile :heavy_check_mark:
* 404 :heavy_check_mark:

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
        - Account profile
            - View/update account holder information
        - Pets list 
            - Create pet profile
                - Form for pet information entry
            - Enter new calendar event
                - Form for event information
            - Preview pet cards
                - Uploaded image, short preview information
                - View pet
                    - Uploaded image, description, weight, birthday, adoption day, microchip number, vet  records, prescriptions, vaccinations, and health conditions
                - Edit pet
                    - Update pet information
        - Calendar
            - Monthly calendar with birthdays, adoption days, vaccine reminders, and vet reminders
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
        - Contact Us
            - Bug reports
            - Customer service

## Technologies
* Angular
    * HTML5, CSS, JavaScript, TypeScript, RxJS
* Purina API
* Petfinder API

## Current Goals
- Best Practice RxJS implementation
- Bookmarks
- Mock Authentication
    - Split modules/ route guards

