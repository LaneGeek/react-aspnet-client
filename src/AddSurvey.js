import React from 'react';
import './App.css';

export default class AddSurvey extends React.Component {

    state = {
        loading: true,
        errors: false,
        firstName: "",
        lastName: "",
        city: "",
        country: "",
        rating: "",
        comment: ""
    };

    async addSurvey() {
        const survey = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            city: this.state.city,
            country: this.state.country,
            rating: Number(this.state.rating),
            comment: this.state.comment
        };
        const response = await fetch(this.props.url, {
            method: 'POST',
            body: JSON.stringify(survey),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await response.json();
        this.setState({ loading: false });
        if (response.status !== 200)
            this.setState({ loading: false, errors: true });
    }

    render() {
        return (
            <div className="App">
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
                <button onClick={() => this.addSurvey()}>Add Survey</button>
                <div>
                    {this.state.loading ? "" : (this.state.errors ? <p>Input Validation Error</p> : <p>Survey Added</p>)}
                </div>
            </div>
        );
    }
};
