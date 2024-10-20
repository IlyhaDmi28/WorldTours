import React from 'react';

function Filters({ isFiltersOpen, closeFilters }) {
    if (!isFiltersOpen) {
        return null; // Если модальное окно закрыто, возвращаем null, чтобы не рендерить его
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeFilters();
        }
    };

    return (
        <div className="filters-overlay" onClick={handleOverlayClick}>
            <div className="filters">
                <h2>Модальное окно</h2>
                <p>Это всплывающее окно, которое блокирует задний фон.</p>
                <button onClick={closeFilters}>Закрыть</button>
            </div>
        </div>
    );
}

export default Filters;
