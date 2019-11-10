import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import grey from '@material-ui/core/colors/grey';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
    card: {
      minWidth: 345,
      minHeight: 150,
      marginBottom: 25,
      marginTop: 25,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      primary: grey[50],
      padding: 20,
      borderRadius: 10,
      border: '2px solid white',
    },
    media : {
      minHeight: 200,
      borderRadius: 10,
      border: '2px solid white',
    },
    control: {
        padding: theme.spacing(2),
    },
    color : {
        color: "white",
    },
    bold : {
        fontWeight: 700,
    },
    palette: {
        backgroundColor: 'white',
      },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
    expandOpen: {
        transform: 'rotate(180deg)',
      },
  }));

const theme = createMuiTheme({
    palette: {
      primary: { main: grey[50] },
    },
  });
export default function StarWarsCard(props) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    return (
        <ThemeProvider theme={theme}>
            
            <Card className={classes.card} justify='center'>
                <CardMedia
                    className={classes.media}
                    image={require("../people/" + props.src)}
                    title="Star Background"
                ></CardMedia>
                <h2 className={classes.color}>{props.name}</h2>
                <IconButton
                    color="primary"
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                </IconButton>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <p className={classes.color}><span className={classes.bold}>Gender:</span> {props.gender.toUpperCase()}</p>
                    <p className={classes.color}><span className={classes.bold}>Eye Color:</span> {props.eyeColor.toUpperCase()}</p>
                    <p className={classes.color}><span className={classes.bold}>Hair Color:</span> {props.hairColor.toUpperCase()}</p>
                    <p className={classes.color}><span className={classes.bold}>Height:</span> {props.height.toUpperCase()}</p>
                    <p className={classes.color}><span className={classes.bold}>Mass:</span> {props.mass.toUpperCase()}</p>
                </Collapse>
            </Card>
            
        </ThemeProvider>
    )
}