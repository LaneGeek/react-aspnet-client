import React from 'react';
import logo from './logo.svg';
import './App.css';
import GetAllSurveys from "./GetAllSurveys";
import GetSingeSurvey from "./GetSingleSurvey";
import DeleteSurvey from "./DeleteSurvey";
import ModifySurvey from "./ModifySurvey";
import AddSurvey from "./AddSurvey";

export default class App extends React.Component
{
    url = 'https://theplanets.azurewebsites.net/Api/Survey/';

    state = {
        view: 0
    };

    selectView() {
        switch (this.state.view) {
            case 1:
                return <GetAllSurveys url={this.url}/>;
            case 2:
                return <GetSingeSurvey url={this.url}/>;
            case 3:
                return <DeleteSurvey url={this.url}/>;
            case 4:
                return <ModifySurvey url={this.url}/>;
            case 5:
                return <AddSurvey url={this.url}/>;
            default:
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
                <br/>
                <button onClick= {() => {this.setState({view: 4})}}>Modify Survey</button>
                <button onClick= {() => {this.setState({view: 5})}}>Add Survey</button>
                {this.selectView()}
            </div>
        );
    }
}
