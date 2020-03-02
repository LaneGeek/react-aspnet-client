import React from 'react';
import './App.css';
import Survey from "./Survey";

export default class GetSingeSurvey extends React.Component {

    state = {
        loading: true,
        survey: {},
        value: "",
        notFound: false
    };

    async renderSurvey(id) {
        const response = await fetch(this.props.url);
        const data = await response.json();
        const survey = data.filter(x => x.surveyId.toString() === id)[0];
        if (survey)
            this.setState({ loading: false, notFound: false, survey });
        else
            this.setState({ loading: false, notFound: true})

    }

    handleChange(x) {
        this.setState({ value: x.target.value })
    }

    render() {
        return (
            <div className="App">
                <p>Enter the survey id: </p>
                <input type="text" name='value' value={this.state.value} onChange={(x) => this.handleChange(x)}/>
                <button onClick={() => this.renderSurvey(this.state.value)}>Get The Survey</button>
                <div>
                    {this.state.loading ? "" : (this.state.notFound ? <p>Survey Not Found</p> : <Survey
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
