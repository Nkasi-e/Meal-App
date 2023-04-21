import React from 'react';
import { useGlobalContext } from '../store';

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext();

  const {
    strMeal: title,
    strMealThumb: image,
    strInstructions: instructions,
    strSource: source,
  } = selectedMeal;

  return (
    <aside className="modal-overlay">
      <div className="modal-container">
        <img src={image} alt={title} className="img modal-img" />
        <div className="modal-content">
          <h4>{title}</h4>
          <p>Cooking Instructions</p>
          <p>{instructions}</p>
          <a href={source} target="_blank">
            Original Source
          </a>
          <button onClick={closeModal} className="btn btn-hipster close-btn">
            close
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
