import React from 'react';
import './App.css';
import Survey from "./Survey";

export default class ModifySurvey extends React.Component {

    state = {
        loading: true,
        survey: {},
        value: "",
        notFound: false,
        modifySuccess: false
    };

    async renderSurvey(id) {
        this.setState({ modifySuccess: false });
        const response = await fetch(this.props.url + "/" + id);
        const data = await response.json();
        if (data.surveyId)
            this.setState({ loading: false, notFound: false, survey: data });
        else
            this.setState({ loading: false, notFound: true })
    }

    async modifySurvey(id, rating) {
        const response = await fetch(this.props.url + "/" + id + "/" + rating, { method: 'PATCH' });
        await response;
        if (response.status === 200)
            this.setState({ modifySuccess: true });
    }

    handleChange(x) {
        this.setState({ value: x.target.value })
    }

    render() {
        return (
            <div className="App">
                <p>This will modify the rating of a survey. Enter the survey id: </p>
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
                            <button onClick={() => this.modifySurvey(this.state.value, 1)}>Modify This Survey's Rating To 1</button><br/>
                            <button onClick={() => this.modifySurvey(this.state.value, 2)}>Modify This Survey's Rating To 2</button><br/>
                            <button onClick={() => this.modifySurvey(this.state.value, 3)}>Modify This Survey's Rating To 3</button><br/>
                            <button onClick={() => this.modifySurvey(this.state.value, 4)}>Modify This Survey's Rating To 4</button><br/>
                            <button onClick={() => this.modifySurvey(this.state.value, 5)}>Modify This Survey's Rating To 5</button>
                            <div>{this.state.modifySuccess ? "Modified" : ""}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};
