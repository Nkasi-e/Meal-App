import React from 'react';
import { useGlobalContext } from '../store';
import { FiThumbsUp } from 'react-icons/fi';

const Meals = () => {
  const { meals, isLoading, selectMealHandler, addToFavouriteHandler } =
    useGlobalContext();

  // Loading
  if (isLoading) {
    return (
      <section className="section">
        <h4>Loading Meals...</h4>
      </section>
    );
  }

  // if no meal is found
  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No Meal Item matched your search. Please try again</h4>
      </section>
    );
  }
  return (
    <section className="section-center">
      {meals.map((meal) => {
        const { idMeal: id, strMeal: title, strMealThumb: image } = meal;
        return (
          <article key={id} className="single-meal">
            <img
              src={image}
              alt={image}
              style={{ width: '200px' }}
              className="img"
              onClick={() => selectMealHandler(id)}
            />
            <footer>
              <h5>{title}</h5>
              <button
                className="like-btn"
                onClick={() => addToFavouriteHandler(id)}
              >
                <FiThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
