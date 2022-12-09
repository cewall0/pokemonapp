import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

// the styles - like css
const useStyles = makeStyles({
    // for the main part of this component
    root: {
        width: "70%",
        margin: "auto",
        marginBottom: 40
    },

    // for the pokemon image
    image: {
        maxWidth: 280,
        width: "40%"
    },
    // for the title
    title: {
        fontSize: 14
    },
    // for the type
    type: {
        marginBottom: 12
    },
    // for the description
    description: {
        width: "70%",
        margin: "auto"
    },
    // for the button
    button: {
        marginBottom: 80
    }
});

// the main function that is called from App.js
function PokemonView(props) {
    /** Use state.  The pokemon data will be stored in "pokemons". */
    const [pokemon, setPokemon] = useState([]);

    /** Use state.  The id data will be stored in id so we know what to view. */
    const id = props.currentID;

    // the styles - like css so we can juse className = {classes.whatever}
    const classes = useStyles();

    /**
     * gets called on component load or when state/props are changed
     * 2 arguments:
     * * 1: function that gets executed (anonymous function expression probably)
     * * 2: array of state items - only items in this array cause useEffect to run on
     * *    state change
     */
    useEffect(() => {
        //axios is going to throw an error on any 4XX/5XX response,
        //so we need to wrap it in a try catch
        // an async function to retrieve the pokemon data.
        async function retrieveData() {
            try {
                const response = await axios({
                    method: "get", //telling axios to get the data.
                    url: "https://web-app-pokemon.herokuapp.com/pokemon/" + id,
                    headers: {
                        "User-Id": "ChadASDF1234"
                    }
                });
                //on success, we store the response data into "pokemons"
                setPokemon(response.data);
            } catch (e) {
                alert(e);
                //some error occurred
            }
        }

        retrieveData();
    }, [id]);

    // the below html is returned to app.js and eventually to index
    return (
        <div>
            {/* a card to hold the pokemon data/information */}
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    {/* the logo image at the top */}
                    <img src={pokemon.image} className={classes.image} alt={pokemon.name}></img>

                    {/* the pokemon name */}
                    <Typography variant="h5" component="h1" color="primary">
                        {pokemon.name}
                    </Typography>

                    {/* the pokemon type */}
                    <Typography className={classes.type} color="secondary">
                        {pokemon.type}
                    </Typography>

                    {/* the pokemon description */}
                    <Typography
                        className={classes.description}
                        variant="body2"
                        component="p"
                        align="justify"
                        marginLeft="auto"
                        marginRight="auto"
                    >
                        {pokemon.description}
                    </Typography>
                </CardContent>
            </Card>
            <div>
                {/* Button to take us back to List.js to list all of the pokemon */}
                <Button
                    className="classes.button"
                    variant="contained"
                    color="secondary"
                    onClick={() => props.setWhichView("list")}
                >
                    Pokemon List
                </Button>
                <p></p>
            </div>
        </div>
    );
}

export default PokemonView;
