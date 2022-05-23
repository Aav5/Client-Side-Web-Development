import React, { Component } from 'react';
import "./style.css";
import _ from "lodash";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {pets:this.props.pets}
  }

  render() {
    return (
      <body>
        <header className="jumbotron jumbotron-fluid py-4">
        <div className="container">
          <h1>Adopt a Pet</h1>
        </div>
        </header>

        <main className="container">
          <div className="row">
            <div id="navs" className="col-3">
              <BreedNav breeds={Object.keys(_.groupBy(this.state.pets, 'breed'))}/>
              <AboutNav />
            </div>

            <div id="petList" className="col-9">
                <PetList pets={this.props.pets} adoptCallback={this.adopt}/>
            </div>
          </div>
        </main>
        <footer className="container">
          <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
        </footer>
      </body>
    )
  }

  adopt = (petName) => {
    this.setState((state) => {
      let pet = _.find(state.pets, ["name", petName]);
      pet.adopted = true;
      return state;
    });
  }
}

export class AboutNav extends Component{
  render() {
    return(
      <nav id="aboutLinks">
        <h2>About</h2>
        <ul className="list-unstyled">
          <li><a href="#/">How to Adopt</a></li>
          <li><a href="#/">Volunteering</a></li>
          <li><a href="#/">Events</a></li>
          <li><a href="#/">Donate</a></li>
          <li><a href="#/">About Us</a></li>
        </ul>
      </nav>
    )
  }
}

export class BreedNav extends Component {
  render() {
    let breedsList = this.props.breeds.map((breed) => {
      return <li key={breed}><a href="">{breed}</a></li>
    })

    return (
      <nav id="breedLinks">
        <h2>Pick a Breed</h2>
        <ul className="list-unstyled">
          {breedsList}
        </ul>
      </nav>
    )
  }
}

export class PetCard extends Component{
  render() {
    let pet = this.props.pet;
    let displayed;

    if(pet.adopted) {
      displayed = " (Adopted)";
    } else {
      displayed = "";
    }

      return(
        <div className="card" onClick={this.handleClick}>
          <img className="card-img-top" src={pet.img} alt={pet.name} />
          <div className="card-body">
            <h3 className="card-title">{pet.name}{displayed}</h3>
            <p className="card-text">{pet.sex} {pet.breed}</p>
          </div>
        </div>
      )
    }

  handleClick = (event) => {
    this.props.adoptCallback(this.props.pet.name);
  }
}

export class PetList extends Component {
  render() {
    let petsList = this.props.pets.map((pet) => {
      return <PetCard key={pet.name} pet={pet} adoptCallback={this.props.adoptCallback}/>
    })
    return (
      <div>
        <h2>Dogs for Adoption</h2>
        <div className="card-deck">
          {petsList}
        </div>
      </div>
    );
  }
}

export default App;
