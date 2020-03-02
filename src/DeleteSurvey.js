import React from 'react';
import './App.css';
import Survey from "./Survey";

export default class DeleteSurvey extends React.Component {

    state = {
        loading: true,
        survey: {},
        value: "",
        notFound: false,
        deleteSuccess: false
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

    async deleteSurvey(id) {
        const response = await fetch(this.props.url + "/" + id, { method: 'DELETE' });
        await response;
        if (response.status === 204)
            this.setState({ deleteSuccess: true });
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
                            <button onClick={() => this.deleteSurvey(this.state.value)}>Delete This Survey</button>
                            <div>{this.state.deleteSuccess ? "Deleted" : ""}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};
