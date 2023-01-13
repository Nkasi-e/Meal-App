import React from 'react';
import { useGlobalContext } from '../store/context';
import { FiThumbsUp } from 'react-icons/fi';

const Meals = () => {
  const { meals } = useGlobalContext();

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
            />
            <footer>
              <h5>{title}</h5>
              <button className="like-btn">
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
