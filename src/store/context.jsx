import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

export const AppProvider = ({ children }) => {
  // state hooks
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null); // for meal to diaplay on modal
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem('favourites')) || []
  );

  // Add to Favourite fn

  const addToFavouriteHandler = (idMeal) => {
    // checking if it already exit in the favourites list
    const alreadyFavourite = favourites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavourite) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updateFavourites = [...favourites, meal];
    setFavourites(updateFavourites);
    localStorage.setItem('favourites', JSON.stringify(updateFavourites));
  };

  // remove from Favourite fn
  const removeFromFavouriteHandler = (idMeal) => {
    const updatedFavourites = favourites.filter(
      (meal) => meal.idMeal !== idMeal
    );
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  // fetching meals fn
  const fetchMeals = async (url) => {
    try {
      const { data } = await axios(url);
      if (data.meals) {
        // setIsLoading(false);
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      if (error.name === 'AxiosError') setMeals('AxiosError');
    }
    setIsLoading(false);
  };

  // selected meal fn
  const selectMealHandler = (idMeal, favouriteMeal) => {
    let meal;
    if (favouriteMeal) {
      meal = favourites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;

    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  // Fetch random meals
  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  // close modal fn
  const closeModal = () => {
    setShowModal(false);
  };

  const context = {
    meals,
    isLoading,
    setSearchTerm,
    randomMeal: fetchRandomMeal,
    showModal,
    selectedMeal,
    selectMealHandler,
    closeModal,
    addToFavouriteHandler,
    removeFromFavouriteHandler,
    favourites,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

// setting custom hooks

export const useGlobalContext = () => {
  return useContext(AppContext);
};

// api
// https://www.themealdb.com/api.php
