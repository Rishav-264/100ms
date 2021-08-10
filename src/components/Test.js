import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Details from "./Details";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    table: {
        minWidth: 650,
      },
      header:{
        fontWeight: 'bold'
      },
      accordion: {
        width: '100%',
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
  }));

const Test = ({characters,searchParam,detailsToggle,setDetailsToggle}) =>{
  const [currentCharacter,setCurrentCharacter] = useState(null);
  const classes = useStyles();
    
    const details = (character) =>{
      console.log("Clicked");
      setCurrentCharacter(character);
      setDetailsToggle(true);
    }
    const table = () =>{
      console.log("Clicked");
      setDetailsToggle(false);
    }

    return(
        <>
        {!detailsToggle&&<TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>Image</TableCell>
            <TableCell className={classes.header}>Name</TableCell>
            <TableCell className={classes.header}>Nickname</TableCell>
            <TableCell className={classes.header}>Potrayed By</TableCell>
            <TableCell className={classes.header}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!detailsToggle&&characters.filter((character)=>{
          if(searchParam === "") return character;
          else if(character.name.toLowerCase().indexOf(searchParam.toLowerCase())!==-1){
            return character;
          }
        }).map((character) => (
            <TableRow key={character.char_id} onClick={()=>{details(character)}}>
              <TableCell><Avatar alt="Remy Sharp" src={character.img} /></TableCell>
              <TableCell component="th" scope="row">
                {character.name}
              </TableCell>
              <TableCell>{(character.nickname!==undefined ? character.nickname:"none")}</TableCell>
              <TableCell>{character.portrayed}</TableCell>
              <TableCell>{character.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    {detailsToggle&&
      <div>
        <IconButton onClick={table}>
          <ArrowBackIcon />
        </IconButton>
        <Details name={currentCharacter.name} image={currentCharacter.img} dob={currentCharacter.birthday} occupation={currentCharacter.occupation}
                 status={currentCharacter.status} nickname={currentCharacter.nickname} actor={currentCharacter.portrayed} seasons={currentCharacter.appearance}
                 bSeasons={currentCharacter.better_call_saul_appearance}
        />
      </div>
    }
        </>
    )

}

export default Test;