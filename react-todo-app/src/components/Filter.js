import React from 'react';
import './Filter.css';

function Filter({ setFilter }) {
    return (
        <div className="filter-container">
            <button className="filter-button" onClick={() => setFilter('all')}>All</button>
            <button className="filter-button" onClick={() => setFilter('active')}>Active</button>
            <button className="filter-button" onClick={() => setFilter('completed')}>Completed</button>
        </div>
    );
}

export default Filter;