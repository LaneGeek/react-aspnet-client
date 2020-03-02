import React from 'react';
import logo from './logo.svg';
import './App.css';
import GetAllSurveys from "./GetAllSurveys";
import GetSingeSurvey from "./GetSingleSurvey";
import DeleteSurvey from "./DeleteSurvey";

export default class App extends React.Component
{
    url = 'https://theplanets.azurewebsites.net/Api/Survey/';

    state = {
        view: 0
    };

    selectView() {
        if (this.state.view === 1) {
            return (
                <GetAllSurveys url={this.url}/>
            );
        }

        if (this.state.view === 2) {
            return (
                <GetSingeSurvey url={this.url}/>
            );
        }

        if (this.state.view === 3) {
            return (
                <DeleteSurvey url={this.url}/>
            );
        }
    }

    render() {
        return (
            <div className="App">
                <header>
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <button onClick= {() => {this.setState({view: 1})}}>Get All Surveys</button>
                <button onClick= {() => {this.setState({view: 2})}}>Get Single Survey</button>
                <button onClick= {() => {this.setState({view: 3})}}>Delete Survey</button>
                {this.selectView()}
            </div>
        );
    }
}
