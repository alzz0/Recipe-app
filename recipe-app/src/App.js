import React, { Component } from 'react';
import Form from "./components/Form"
import Recipes from "./components/Recipes"
import './App.css';

const API_KEY="c1fec899dba79735c67b07571439e9c2"

class App extends Component {
    state={
        recipes:[]
    }

     getRecipe= async(e)=>{
         const recipeName = e.target.elements.recipeName.value;
         e.preventDefault()
         const api_call= await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}`)
        const data = await api_call.json()
        this.setState({recipes:data.recipes})
         console.log(this.state.recipes)
      }
     componentDidMount=()=>{
         const json= localStorage.getItem("recipes")
         const recipes=JSON.parse(json)
         this.setState({recipes:recipes})
     }
     
     componentDidUpdate=()=>{
         const recipes=JSON.stringify(this.state.recipes)
         localStorage.setItem("recipes",recipes)
     }
      
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes}/>
            </div>
                )
  
  }
}

export default App;
