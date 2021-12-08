# What-Do-API

The what-do-api package is the server support the main what-do-app.
It manages users, locations, itinerary, and supports general
queries around map functionality.

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
They can create an itinerary completely at random by applying constraints.
They can add friends and invite friends to join an itinerary.

## Rooadmap

- [x] Locations
  - [x] GET by id
  - [x] GET all
  - [ ] GET by options
  - [x] PUT update by id
  - [x] POST create
  - [x] POST create by g-maps URL
  - [x] DELETE by id
  - [ ] GET randomizer
- [ ] Users
  - [ ] POST (login) find or create by Google ID
  - [ ] PUT update profile
  - [ ] GET by id
  - [ ] DELETE by id (deactivate)
- [ ] Itinerary
  - [ ] GET by id
  - [ ] GET by owner id
  - [ ] POST create
  - [ ] PUT update by id
  - [ ] PUT add location
- [ ] Videos
  - [ ] GET by user id
  - [ ] GET by location id
  - [ ] POST add to location
  - [ ] PUT update video
  - [ ] DELETE by id
