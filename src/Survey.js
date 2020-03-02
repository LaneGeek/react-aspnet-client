import React from 'react';
import './App.css';

const Survey = ({ surveyId, surveyDateTime, firstName, lastName, city, country, rating, comment }) => {
    return (
        <div className="Survey">
            <h6>Survey ID: {surveyId} Date/Time: {surveyDateTime}</h6>
            <h6>by {firstName} {lastName} of {city}, {country} wrote</h6>
            <h6>"{comment}"</h6>
            <h6>and gave a rating of {rating} stars.</h6>
        </div>
    );
};

export default Survey;
