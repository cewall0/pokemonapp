import "./App.css";
import React, { useState } from "react";
import logo from "./images/logo.jpeg";
import List from "./components/List";
import PokemonView from "./components/PokemonView";
import PokemonAdd from "./components/PokemonAdd";
import "./App.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

// useStyles are like the css for React
const useStyles = makeStyles({
    // to style the pokemon logo and make it responsive to the screen size.
    logoImage: {
        maxWidth: 400,
        width: "80%",
        margin: "auto",
        padding: "40px"
    },

    // to center the parts of the main app
    appWrapper: {
        margin: "auto",
        textAlign: "center"
    }
});

// The main App function
function App() {
    // useState which keeps track on if we want to view the list, view, or add pages.
    const [whichView, setWhichView] = useState("list");

    // useState that keeps track of the id if we want to view or delete it.
    const [currentID, setCurrentID] = useState("");

    // this allows the useStyles to be used as className={classes.whatever}
    const classes = useStyles();

    // This is what is passed as html to the index
    return (
        <div className={classes.appWrapper}>
            <div>
                <header>
                    {/* the logo */}
                    <img src={logo} className={classes.logoImage} alt="logo" />
                </header>
            </div>
            <div className={classes.appWrapper}>
                {/* if we are to view the list component */}
                {whichView === "list" && (
                    <React.Fragment>
                        <List
                            // pass the following props to the list component
                            whichView={whichView}
                            setWhichView={setWhichView}
                            currentID={currentID}
                            setCurrentID={setCurrentID}
                        />
                        <p></p>
                        {/* clicking the button takes us to the add page */}
                        <Button variant="contained" color="secondary" onClick={() => setWhichView("add")}>
                            Add Pokemon
                        </Button>
                        <p></p>
                    </React.Fragment>
                )}

                {/* if we want to go to the view component */}
                {whichView === "view" && (
                    <React.Fragment>
                        {/* Need to get the ID to view from List.js and Pass the id to PokemonView. */}
                        <PokemonView whichView={whichView} setWhichView={setWhichView} currentID={currentID} />
                    </React.Fragment>
                )}
                {/* if we want to go to the add component */}
                {whichView === "add" && (
                    <React.Fragment>
                        {/* Go to PokemonAdd.js for a form to input the pokemon data and post that to the database. */}
                        <PokemonAdd whichView={whichView} setWhichView={setWhichView} />
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

export default App;
