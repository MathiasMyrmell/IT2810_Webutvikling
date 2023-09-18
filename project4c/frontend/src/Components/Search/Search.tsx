import * as React from 'react';
import { CardContent } from '@mui/material';
import './Search.css';
import SearchForm from './SearchForm';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { changeSorted, changeSearchTitle } from '../../Redux/sortSlice';
import sanitize from '../../tools/sanitize';
import { InputField, SearchCard } from '../MuiElements/muiElements';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from '@mui/material/InputAdornment';

export default function Search() {
    // Redux
    const dispatch = useAppDispatch();
    const selected = useAppSelector(state => state.sort)

    const [searchValue, setSearchValue] = React.useState("");

    const formSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeSorted(event.target.value));
    }

    // So that the select option is correct
    var selectedSorting = <div></div>;
    if (selected.sorted == 'ASC') {
        selectedSorting = (
            <select aria-label="for sorting" defaultValue={"A-Z"} className="form-control" onChange={formSorting}>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>)
    } else if (selected.sorted == 'DESC') {
        selectedSorting = (
            <select aria-label="for sorting" defaultValue={"Z-A"} className="form-control" onChange={formSorting}>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>)
    }

    // icon button click event for search title
    const handleClick = () => {
        dispatch(changeSearchTitle(sanitize(searchValue)));
    }
 

    return (
        <div className="Search">
            <SearchCard>
                <CardContent>
                    <h2>Search</h2>
                    <InputField 
                        label='Title' 
                        id='searchField'
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleClick();
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton aria-label="search" onClick={handleClick}>
                                    <SearchIcon style={{ fill: "black" }} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                    />
                    
                    <h2>Select</h2>
                    <SearchForm />
                    <h2>Sort</h2>
                    {selectedSorting}
                </CardContent>
            </SearchCard>
        </div>
    );
}
