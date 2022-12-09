import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CssBaseline } from "@material-ui/core";

// useStyles is like the CssBaseline. (theme) is passed to it because the theme is defined in index with primary/secondary colors, etc.
const useStyles = makeStyles((theme) => ({
    // the main part of the app
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch"
        }
    },

    // the button
    buttonLook: {
        margin: "10px"
    }
}));

// the main function that is called from App.js
function PokemonAdd(props) {
    // classes is for className={classes.whatever} for styling
    const classes = useStyles();

    // useState for the name, type, description, imageURL for the pokemons
    const [nameVariable, setNameVariable] = useState("");
    const [typeVariable, setTypeVariable] = useState("");
    const [descriptionVariable, setDescriptionVariable] = useState("");
    const [imageURLVariable, setImageURLVariable] = useState("");

    // useState to keep track on if the submit button is disabled (true) or not (false)
    const [buttonDisabled, setButtonDisabled] = useState(true);

    /**
     * useEffect runs after component loads or with state changes
     * We want to validate the input of the input fields each time something is entered.
     */
    useEffect(() => {
        validateInput();
    });

    /**
     * Runs on rerender.  If all required text fields/inputs are filled
     * it will cause the button to be enabled (not disabled)
     */
    function validateInput() {
        // Do all of the variable input fields have something? Are all of these truthy?
        if (nameVariable && typeVariable && descriptionVariable && imageURLVariable) {
            // if so, let's make buttonDisabled = false.
            setButtonDisabled(false);
        } else {
            // otherwise, keep the submit button disabled.
            setButtonDisabled(true);
        }
    }
    /**
     * gets called on submit button click to post the data
     */
    async function postData() {
        //axios is going to throw an error on any 4XX/5XX response,
        //so we need to wrap it in a try catch
        // an async function to post the pokemon data.
        try {
            await axios({
                method: "post", //telling axios to post the data.
                url: "https://web-app-pokemon.herokuapp.com/pokemon/",
                data: {
                    name: nameVariable,
                    type: typeVariable,
                    description: descriptionVariable,
                    image: imageURLVariable
                },
                headers: {
                    "User-Id": "ChadASDF1234"
                }
            });
        } catch (e) {
            alert(e);
            //some error occurred
        }

        // Let's switch our view back to the list view calling list.js
        props.setWhichView("list");
    }

    // the html that returns to app.js and eventually to index.
    return (
        // input fields
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                {/* for the name of the pokemon */}
                <TextField
                    id="name"
                    label="Pokemon Name"
                    placeholder="Name"
                    multiline
                    variant="outlined"
                    onChange={(event) => setNameVariable(event.target.value)}
                />

                {/* for the type of the pokemon */}
                <TextField
                    id="type"
                    label="Type"
                    placeholder="Type"
                    multiline
                    variant="outlined"
                    onChange={(event) => setTypeVariable(event.target.value)}
                />

                {/* for the description of the pokemon */}
                <TextField
                    id="description"
                    label="Description"
                    placeholder="Description"
                    multiline
                    variant="outlined"
                    onChange={(event) => setDescriptionVariable(event.target.value)}
                />

                {/* for the photo URL of the pokemon */}
                <TextField
                    id="photo"
                    label="Photo URL"
                    placeholder="Photo URL"
                    multiline
                    variant="outlined"
                    onChange={(event) => setImageURLVariable(event.target.value)}
                />
            </div>
            <div>
                {/* for the button to submit the pokemon data */}
                <Button
                    disabled={buttonDisabled}
                    className={classes.buttonLook}
                    variant="contained"
                    color="secondary"
                    onClick={() => postData()}
                >
                    Submit
                </Button>

                {/* for the button to return to the pokemon list */}
                <Button
                    className={classes.buttonLook}
                    variant="contained"
                    color="secondary"
                    onClick={() => props.setWhichView("list")}
                >
                    Pokemon List
                </Button>
            </div>
        </form>
    );
}

export default PokemonAdd;
