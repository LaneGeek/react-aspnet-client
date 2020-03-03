import React from 'react';
import './App.css';
import Survey from "./Survey";

export default class ReplaceSurvey extends React.Component {

    state = {
        loading: true,
        survey: {},
        value: "",
        notFound: false,
        deleteSuccess: false,
        errors: false,
        firstName: "",
        lastName: "",
        city: "",
        country: "",
        rating: "",
        comment: ""
    };

    async renderSurvey(id) {
        this.setState({ deleteSuccess: false });
        const response = await fetch(this.props.url + "/" + id);
        const data = await response.json();
        if (data.surveyId)
            this.setState({ loading: false, notFound: false, survey: data });
        else
            this.setState({ loading: false, notFound: true })
    }

    async replaceSurvey() {
        this.setState({ loading: true });
        const survey = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            city: this.state.city,
            country: this.state.country,
            rating: Number(this.state.rating),
            comment: this.state.comment
        };
        const response = await fetch(this.props.url + '/' + this.state.value, {
            method: 'PUT',
            body: JSON.stringify(survey),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await response.json();
        this.setState({ loading: false, errors: false });
        if (response.status !== 200)
            this.setState({ loading: false, errors: true });
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
                    {this.state.loading ? "" : (this.state.notFound ? <p>Survey Not Found</p> : (<div><Survey
                            surveyId={this.state.survey.surveyId}
                            surveyDateTime={this.state.survey.surveyDateTime}
                            firstName={this.state.survey.firstName}
                            lastName={this.state.survey.lastName}
                            city={this.state.survey.city}
                            country={this.state.survey.country}
                            rating={this.state.survey.rating}
                            comment={this.state.survey.comment}
                        />
                            <br/>First Name
                            <input type="text" name='value' value={this.state.firstName} onChange={
                                (x) => this.setState({ firstName: x.target.value })
                            }/>
                            <br/>Last Name
                            <input type="text" name='value' value={this.state.lastName} onChange={
                                (x) => this.setState({ lastName: x.target.value })
                            }/>
                            <br/>City
                            <input type="text" name='value' value={this.state.city} onChange={
                                (x) => this.setState({ city: x.target.value })
                            }/>
                            <br/>Country
                            <input type="text" name='value' value={this.state.country} onChange={
                                (x) => this.setState({ country: x.target.value })
                            }/>
                            <br/>Rating
                            <input type="text" name='value' value={this.state.rating} onChange={
                                (x) => this.setState({ rating: x.target.value })
                            }/>
                            <br/>Comment
                            <input type="text" name='value' value={this.state.comment} onChange={
                                (x) => this.setState({ comment: x.target.value })
                            }/>
                            <br/><br/>
                            <button onClick={() => this.replaceSurvey()}>Replace Survey</button>
                            <div>
                                {this.state.loading ? "" : (this.state.errors ? <p>Input Validation Error</p> : <p>Survey Replaced</p>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};
