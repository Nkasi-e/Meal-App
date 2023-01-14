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
      console.log(error.response);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  // Fetch random meals
  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  const context = {
    meals,
    isLoading,
    setSearchTerm,
    randomMeal: fetchRandomMeal,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

// setting custom hooks

export const useGlobalContext = () => {
  return useContext(AppContext);
};

// api
// https://www.themealdb.com/api.php
