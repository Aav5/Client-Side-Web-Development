import React, { Component } from 'react'; //import React Component
import {AboutPage, ResourcesPage} from './About';
import AdoptPage from './AdoptPet';
import './App.css'; //import css file!
import { BrowserRouter as Router, Route, Switch, Link, Redirect, NavLink} from 'react-router-dom'

import SAMPLE_DOGS from './dogs.json'; //a sample list of dogs (model)

class App extends Component {
  constructor(props){
    super(props);
    this.state = {pets: []};
  }

  componentDidMount() {
    //pretend we loaded external data
    this.setState({pets: SAMPLE_DOGS});
  }

  render() {
    function petRenderList(props)
    {
      return <PetList pets = {props.pets} />;
    }
    return (
      <div>
        <header className="jumbotron jumbotron-fluid py-4">
          <div className="container">
            <h1><Link to="/">Adopt a Pet</Link></h1>
          </div>
        </header>

        <main className="container">
          <div className="row">
            <div className="col-3">
              <AboutNav />
            </div>
            <div className="col-9">
              <Switch>
                  <Route exact path="/" render = {() =>
                    {
                      return petRenderList(this.state);
                    }} />
                  <Route path="/about" component={AboutPage} />
                  <Route path="/resources" component={ResourcesPage} />
                  <Route path="/adopt/:petName" component={AdoptPage} />
                  <Redirect to="/" render = {() =>
                    {
                      return petRenderList(this.state);
                    }}/>
                </Switch>
            </div>
          </div>
        </main>

        <footer className="container">
          <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
        </footer>
      </div>
    );
  }
}

class AboutNav extends Component {
  render() {
    return (
      <nav id="aboutLinks">
        <h2>About</h2>
        <ul className="list-unstyled">
          <li><NavLink exact to="/" activeClassName="activeLink">Adopt a Pet</NavLink></li>
          <li><NavLink to="/about" activeClassName="activeLink">About Us</NavLink></li>
          <li><NavLink to="/resources" activeClassName="activeLink">Resources</NavLink></li>
        </ul>
      </nav>
    );
  }
}

class PetList extends Component {
  render() {
    let pets = this.props.pets || []; //handle if not provided a prop
    let petCards = pets.map((pet) => {
      return <PetCard key={pet.name} pet={pet} />;
    })

    return (
      <div>
        <h2>Dogs for Adoption</h2>
        <div className="card-deck">
          {petCards}
        </div>
      </div>
    );
  }
}

class PetCard extends Component {
  constructor(props){
    super(props);
    this.state = {redirectPet: false};
  }

  handleClick = () => {
    this.setState({redirectPet: true});
    console.log("You clicked on", this.props.pet.name);
  }

  render() {
    let pet = this.props.pet; //shortcut
    if(this.state.redirectPet)
    {
      return (<Redirect push to={"/adopt/" + pet.name}></Redirect>);
    }
    return (
      <div className="card clickable" onClick={this.handleClick}>
        <img className="card-img-top" src={pet.images[0]} alt={pet.name} />
        <div className="card-body">
          <h3 className="card-title">{pet.name} {pet.adopted ? '(Adopted)' : ''}</h3>
          <p className="card-text">{pet.sex} {pet.breed}</p>
        </div>
      </div>
    );
  }
}

export default App;