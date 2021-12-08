# What-Do-API

The what-do-api package is the server support the main what-do-app. It manages users, locations, itinerary, and supports general queries around map functionality.

## Installation

1. Clone the repo
2. Install dependencies using `yarn`
3. Copy the .env and set your parameters
4. Run it with `yarn serve`

## Features

Users will register/login via Google OAuth.
They can browse the map or search for locations by name or type.
They can search by random settings.
They can create an itinerary (trip planning) by manually adding locations.
They can create an itinerary completely at random by applying constraints and a date range.
They can add friends and invite friends to join an itinerary.

## Rooadmap

- [x] Locations
  - [x] GET all
  - [ ] GET by options
  - [x] GET by ID
  - [x] PUT update by ID
  - [x] POST create
  - [x] POST create by g-maps URL
  - [x] DELETE by ID
  - [ ] GET randomizer
- [ ] Users
- [ ] Itinerary
- [ ] Videos
