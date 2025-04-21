# Tri Vu's `Pokémon Count!` Mobile App

## Table of Contents

* [Title](https://github.com/trimvu/Pokemon-Count-App#tri-vus-pokemon-count-mobile-app)
* [Version](https://github.com/trimvu/Pokemon-Count-App#version)
* [Live Demo](https://github.com/trimvu/Pokemon-Count-App#live-demo)
* [About](https://github.com/trimvu/Pokemon-Count-App#about)
* [Technology Stack](https://github.com/trimvu/Pokemon-Count-App#technology-stack)
* [MVP (Minimum Viable Product)](https://github.com/trimvu/Pokemon-Count-App#mvp-minimum-viable-product)
* [Stretch Goals](https://github.com/trimvu/Pokemon-Count-App#completed-stretch-goals)
* [Potential Future Goal](https://github.com/trimvu/Pokemon-Count-App#potential-future-goal)
* [Developer](https://github.com/trimvu/Pokemon-Count-App#developer)

## Version

### 1.0.2
Patch to update issue of card and sprite loading after guessing.

### 1.0.1
Patch to update styling for larger phones.

### 1.0.0
First build of the application. The app comes with two game modes: `Same Number?` and `Multiple Choice`. 

## Live Demo

[Android APK](https://drive.google.com/drive/folders/1tNV41-DajzJ50ibHt7Hxpgi-Vy7y2rR-?usp=sharing)

**NOTE**: Must have an Android device to run the application.

Expo's instruction on how to install the application on Android devices:

> On devices running Android 8.0 (API level 26) and higher, you must navigate to the **Install unknown apps** system settings screen to enable app installations from a particular location (i.e. the web browser you are downloading the app from).

> On devices running Android 7.1.1 (API level 25) and lower, you should enable the **Unknown sources system** setting, found in **Settings > Security** on your device.

## About

`Pokémon Count!` is a mobile application created for my niece to play and learn at the same time. The application has two interactive game modes: `Same Number?` and `Multiple Choice`. Both game modes have three levels of difficulty: Easy, Normal, and Hard. In `Same Number?`, users are required to count the amount of Pokémon sprites on the screen and compare with the number displayed on the screen whether the amount are the same or not. In `Multiple Choice`, users are also required to count the amount of Pokémon sprites on the screen, then choose one of four options for the correct answer. As for the difficulty, Easy mode has up to 5 sprites, Normal has up to 10 sprites, while Hard has up to 20 sprites on the screen.

A `Search` feature is coming soon! Users will be able to search for their favorite Pokémon and view all the available cards. 

## Technology Stack

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Axios](https://axios-http.com/docs/intro)
* [Pokémon TCG API](https://pokemontcg.io/)
* [PokéAPI](https://pokeapi.co/)

## MVP (Minimum Viable Product)

* Completing the `Same Number?` game mode where users compare the amount of sprites to the displayed number on screen
* Completing the `Multiple Choice` game mode where users compare teh amount of sprites and choose one of four options available
* Displaying Pokémon cards to the screen using [Pokémon TCG API](https://pokemontcg.io/)
* Displaying Pokémon sprites to the screen using [PokéAPI](https://pokeapi.co/), while reflecting which card is currently displayed (if possible)
* A moderately appealing user interface

## Completed Stretch Goals

* Giving the users the ability to choose the game mode difficulty of Easy, Normal, or Hard.
* Displaying the difficulty options through Modals
* Displaying the results of user actions through Modals
* Changing an answer's button color when users hold the button down for visual feedback

## Potential Future Goal

* A `Search` feature to search for a specific Pokémon and its cards
* A `Favorites` feature that will allow users to favorite specific cards
* A backend to allow users to save favorites.

## Developer

Tri - [LinkedIn](https://www.linkedin.com/in/tri-minh-vu/) - [GitHub](https://github.com/trimvu) - [Portfolio](https://tri-vu-dev.netlify.app/)