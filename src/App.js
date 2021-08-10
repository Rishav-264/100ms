import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Test from "./components/Test";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App() {
  const [detailsToggle,setDetailsToggle] = useState(false);
  const [characters,setCharacters] = useState([]);
  const [charactersA,setCharactersA] = useState([]);
  const [searchParam,setSearch] = useState("");
  const [category, setCategory] = useState({
    checkedBreakingBad: false,
    checkedSaul: false,
    checkedAll: true,
  });
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(10);
  const classes = useStyles();

  const categoryChange=(category,check)=>{
    console.log(category);
    console.log(check);
    if(category==="All"){
      if(check===false){
        setCharacters(charactersA);
        setCategory({
          checkedBreakingBad: false,
          checkedSaul: false,
          checkedAll: true,
        });
        console.log(category,check);
      }else{
        setCategory({
          checkedBreakingBad: false,
          checkedSaul: false,
          checkedAll: false,
        });
      }
    }
    if(category==="BreakingBad"){
      if(check===false){
        setCharacters(charactersA.filter((character=>{if(character.category.includes("Breaking Bad")) return character})));
        setCategory({
          checkedBreakingBad: true,
          checkedSaul: false,
          checkedAll: false,
        });
      }else{
        setCategory({
          checkedBreakingBad: false,
          checkedSaul: false,
          checkedAll: false,
        });
      }
    }
    if(category==="BetterCallSaul"){
      if(check===false){
        setCharacters(charactersA.filter((character=>{if(character.category.includes("Better Call Saul")) return character})));
        setCategory({
          checkedBreakingBad: false,
          checkedSaul: true,
          checkedAll: false,
        });
      }else{
        setCategory({
          checkedBreakingBad: false,
          checkedSaul: false,
          checkedAll: false,
        });
      }
    }
  }

  useEffect(()=>{
    axios.get("https://www.breakingbadapi.com/api/characters").then(res=>{
        setCharacters(res.data);
        setCharactersA(res.data);
        console.log(res.data);
    })
  },[])

  const indexOfLastCharacters = currentPage * postsPerPage;
  const indexOfFirstCharacters = indexOfLastCharacters - postsPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacters, indexOfLastCharacters)
  console.log(currentCharacters);

  const paginationClick = (event,value) =>{
    setCurrentPage(value);
  }

  const search = (e) =>{
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h6" noWrap>
            BreakingBadApi
          </Typography>
          <FormGroup row>
    <FormControlLabel
        className={classes.checkbox}
        control={
          <Checkbox
            checked={category.checkedAll}
            onChange={()=>{return categoryChange("All",category.checkedAll)}}
            name="checkedA"
            color="secondary"
          />
        }
        label="All"
      />
      <FormControlLabel
        className={classes.checkbox}
        control={
          <Checkbox
            checked={category.checkedBreakingBad}
            onChange={()=>{return categoryChange("BreakingBad",category.checkedBreakingBad)}}
            name="checkedB"
            color="secondary"
          />
        }
        label="Breaking Bad"
      />
      <FormControlLabel
        className={classes.checkbox}
        control={
          <Checkbox
            checked={category.checkedSaul}
            onChange={()=>{return categoryChange("BetterCallSaul",category.checkedSaul)}}
            name="checkedC"
            color="secondary"
          />
        }
        label="Better Call Saul"
      />
    </FormGroup>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={search}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
      <Test characters={currentCharacters} searchParam={searchParam} detailsToggle={detailsToggle} setDetailsToggle={setDetailsToggle}/>
      {!detailsToggle&&<Pagination count={Math.ceil(characters.length/10)} color="primary" onChange={paginationClick}/>}
    </div>
  );
}

export default App;
