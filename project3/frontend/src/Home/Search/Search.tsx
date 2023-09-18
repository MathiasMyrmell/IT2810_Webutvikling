import * as React from 'react';
import { TextField, CardContent, CardActions, Card, Box } from '@mui/material';
import './Search.css';
import SearchForm from './SearchForm';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { changeSorted, changeSearchTitle } from '../../Redux/sortSlice';
import sanitize from '../../tools/sanitize';

export default function Search() {
    // Redux
    const dispatch = useAppDispatch();
    const selected = useAppSelector(state => state.sort)

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

    const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSearchTitle(sanitize(event.target.value)));
    }

    return (
        <div className="Search">
            <Card sx={{ minWidth: 275, backgroundColor: '#F8F8F8' }}>
                <CardContent>
                    <h2>Search</h2>
                    <TextField label='Title' id='searchField' sx={{ backgroundColor: '#F8F8F8' }} onChange={getTitle} />
                    <h2>Select</h2>
                    <SearchForm />
                    <h2>Sort</h2>
                    {selectedSorting}
                </CardContent>
            </Card>
        </div>
    );
}
