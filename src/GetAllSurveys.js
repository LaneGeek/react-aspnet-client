import React from 'react';
import './App.css';
import Survey from "./Survey";

export default class GetAllSurveys extends React.Component {

    state = {
        loading: true,
        surveys: []
    };

    async componentDidMount() {
        const response = await fetch(this.props.url);
        const data = await response.json();
        this.setState({ loading: false, surveys: data })
    }

    render() {
        return (
            <div className="App">
                {this.state.loading ? <div>loading...</div> : <div>{
                    this.state.surveys.map(x => (
                        <Survey
                            surveyId={x.surveyId}
                            surveyDateTime={x.surveyDateTime}
                            firstName={x.firstName}
                            lastName={x.lastName}
                            city={x.city}
                            country={x.country}
                            rating={x.rating}
                            comment={x.comment}
                        />
                    ))
                }</div>}
            </div>
        );
    }
};
