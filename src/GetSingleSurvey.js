import React from 'react';
import './App.css';
import Survey from "./Survey";

export default class GetSingeSurvey extends React.Component {

    state = {
        loading: true,
        survey: {},
        value: 0,
        notFound: false
    };

    async renderSurvey(id) {
        const response = await fetch(this.props.url);
        const data = await response.json();
        const survey = data.filter(x => x.surveyId == id)[0];
        if (survey)
            this.setState({ loading: false, notFound: false, survey: survey });
        else
            this.setState({ loading: false, notFound: true})

    }

    handleChange(e) {
        this.setState({ value: e.target.value })
    }

    render() {
        return (
            <div className="App">
                <p>Enter the survey id: </p>
                <input type="text" name='value' value={this.state.value} onChange={(e) => this.handleChange(e)}/>
                <button onClick={() => this.renderSurvey(this.state.value)}>Get The Survey</button>
                <div>
                {this.state.loading ? "loading..." : (this.state.notFound ? "Survey Not Found" : <Survey
                    surveyId={this.state.survey.surveyId}
                    surveyDateTime={this.state.survey.surveyDateTime}
                    firstName={this.state.survey.firstName}
                    lastName={this.state.survey.lastName}
                    city={this.state.survey.city}
                    country={this.state.survey.country}
                    rating={this.state.survey.rating}
                    comment={this.state.survey.comment}
                />)}
                </div>
            </div>
        );
    }
};
