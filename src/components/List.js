import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// a function for the snackbar alert message.
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// this is like css styline.
// The StyledTableCell is a tablecell wrapper.
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: "white"
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

// more styling of the table to shade every other row
const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);

// the styles - like css
const useStyles = makeStyles((theme) => ({
    table: {
        width: "70%",
        margin: "auto"
    },
    appWrapper: {
        margin: "auto",
        textAlign: "center"
    }
}));

// the list function which was called from app.js
function List(props) {
    /** Use state.  The pokemon data will be stored in "pokemons". */
    const [pokemons, setPokemons] = useState([]);

    // this allows the useStyles to be used as className={classes.whatever}
    const classes = useStyles();

    // useState to determine whether the alert (snackbar) ois turned on (true) or not (false)
    const [alertOn, setAlertOn] = useState(false);

    // this function sets the alert response to true, so the snackbar pops up
    function sendAlert() {
        setAlertOn(true);
    }

    // function to handle if the alert(snackbar) is closed
    const handleClose = (event, reason) => {
        // if they click away, jump out.
        if (reason === "clickaway") {
            return;
        }
        // reset the AlertResponse to false
        setAlertOn(false);
    };

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
        retrieveData();
    }, []); // end useEffect

    // this function sets the currentID to the id we wnat to view and changes the state of whichView
    // to call the PokemonView.js component.
    function goView(id) {
        props.setCurrentID(id);
        props.setWhichView("view");
    }

    // this function retrieves all of the pokemon data.
    async function retrieveData() {
        try {
            const response = await axios({
                method: "get", //telling axios to get the data.
                url: "postgres://pokemon_e8l3_user:eGMGhgMU2UqzyIiwXsoaJzx9FqgT8dxa@dpg-ceb4ngpa6gdichjusbc0-a.oregon-postgres.render.com/pokemon_e8l3"
                // headers: {
                //     "User-Id": "ChadASDF1234"
                // }
            });
            //on success, we store the response data into "pokemons"
            setPokemons(response.data);
        } catch (e) {
            alert(e);
            // alert that some error occurred
        }
    }

    // this function deletes the pokemon we click on and recalls the entire list after one if deleted.
    async function deletePokemon(id) {
        try {
            await axios({
                method: "delete", //telling axios to delete the data.
                url:
                    "postgres://pokemon_e8l3_user:eGMGhgMU2UqzyIiwXsoaJzx9FqgT8dxa@dpg-ceb4ngpa6gdichjusbc0-a.oregon-postgres.render.com/pokemon_e8l3" +
                    id
                // headers: {
                //     "User-Id": "ChadASDF1234"
                // }
            });
        } catch (e) {
            sendAlert();
            //some error occurred so we will tell the user with a snackbar
        }

        // recall the data again to rebuild the list.
        retrieveData();
    }

    // the html is returned to app.js to render there.
    return (
        <div className="appWrapper">
            {/* the alert is a snackbar to enhance the user experience */}
            <Snackbar open={alertOn} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Cannot delete this pokemon.
                </Alert>
            </Snackbar>

            {/* Typography helps style the title of the page */}
            <Typography variant="h3" component="h1" color="secondary">
                Pokemon List
            </Typography>
            <p></p>

            {/* The list of the pokemons as a table */}
            <TableContainer>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.headerRow} align="center">
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Type</StyledTableCell>
                            <StyledTableCell align="center">View</StyledTableCell>
                            <StyledTableCell align="center">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pokemons.map((pokemon) => (
                            <StyledTableRow key={pokemon.id}>
                                <TableCell align="center">{pokemon.name}</TableCell>
                                <TableCell align="center">{pokemon.type}</TableCell>
                                <TableCell align="center">
                                    {/* if the visibility icon is clicked, the goView function is called 
                                    calling the pokemonview.js and the id of the pokemon we will view is
                                    passed to it so it can be veiwed  */}
                                    {<VisibilityIcon color="primary" onClick={() => goView(pokemon.id)} />}
                                </TableCell>
                                <TableCell align="center">
                                    {/* if the delete icon is clicked, the deletePokemon function is called 
                                    to delete it. The id of the pokemon we will delete is
                                    passed to it so it can be deleted  */}
                                    {<DeleteIcon color="primary" onClick={() => deletePokemon(pokemon.id)} />}
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default List;
