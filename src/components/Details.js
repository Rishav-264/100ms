import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    image:{
        marginLeft:"1rem",
        width:"400px",
        height:"500px"
    },
    info:{
        display:"block"
    },
    table: {
        maxWidth: "700px",
      },
  }));

const Details = ({name,image,dob,occupation,status,nickname,actor,seasons,bSeasons}) =>{

    const classes = useStyles();

    return(
        <>
        <Grid container>
            <Grid item xs={4}>
                <img src={image} className={classes.image} alt=""/>
            </Grid>
            <Grid item xs={8}>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                Name
                            </TableCell>
                            <TableCell>
                                {name}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Date Of Birth
                            </TableCell>
                            <TableCell>
                                {dob}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Occupation
                            </TableCell>
                            <TableCell>
                                {occupation}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Status
                            </TableCell>
                            <TableCell>
                                {status}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Nickname
                            </TableCell>
                            <TableCell>
                                {nickname}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Actor
                            </TableCell>
                            <TableCell>
                                {actor}
                            </TableCell>
                        </TableRow>
                        {(seasons!==undefined&&seasons.length!==0)&&
                            <TableRow>
                            <TableCell>
                                Seasons
                            </TableCell>
                            <TableCell>
                            {seasons.map(season=>{
                                return season+"   "
                            })}
                            </TableCell>
                            </TableRow>
                        }
                        {(bSeasons!==undefined&&bSeasons.length!==0)&&
                            <TableRow>
                            <TableCell>
                                Better Call Saul Seasons
                            </TableCell>
                            <TableCell>
                            {bSeasons.map(season=>{
                                return season+"   "
                            })}
                            </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            </Grid>
        </Grid>
        </>
    )
}

export default Details;