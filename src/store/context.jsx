import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

export const AppProvider = ({ children }) => {
  // state hooks
  const [meals, setMeals] = useState([]);
  // fetching meals fn
  const fetchMeals = async (url) => {
    try {
      const { data } = await axios(url);
      setMeals(data.meals);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  const context = {
    meals,
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

// setting custom hooks

export const useGlobalContext = () => {
  return useContext(AppContext);
};

// api
// https://www.themealdb.com/api.php
