import React from 'react';
import logo from './logo.svg';
import './App.css';
import Survey from "./Survey";

export default class App extends React.Component
{
    url = 'https://theplanets.azurewebsites.net/Api/Survey/';

    state = {
        loading: true,
        surveys: []
    };

    async componentDidMount() {
        const response = await fetch(this.url);
        const data = await response.json();
        console.log(data);
        this.setState({loading: false, surveys: data})
    }

    render()
    {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
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
                </header>
            </div>
        );
    }
}
