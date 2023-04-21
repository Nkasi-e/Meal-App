import React from 'react';
import { useGlobalContext } from '../store';

const Favorites = () => {
  const { favourites, removeFromFavouriteHandler, selectMealHandler } =
    useGlobalContext();

  return (
    <section className="favorites">
      <section className="favorites-content">
        <h5>Favourites</h5>
        <div className="favorites-container">
          {favourites.map((meal) => {
            const { idMeal: id, strMealThumb: image } = meal;
            return (
              <div key={id} className="favorite-item">
                <img
                  src={image}
                  alt={meal.strMeal}
                  className="favorites-img img"
                  onClick={() => selectMealHandler(id, true)}
                />
                <button
                  className="remove-btn"
                  onClick={() => removeFromFavouriteHandler(id)}
                >
                  remove{' '}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Favorites;
