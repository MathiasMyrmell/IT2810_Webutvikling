import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {  useAppDispatch } from '../../Redux/hooks';
import { changeSelectedIngredients } from '../../Redux/sortSlice';


export default function SearchForm() {
    // Redux
    const dispatch = useAppDispatch();

    // All the ingredients and initialize with unchecked boxes
    const ingredients: Array<string> = ['chicken', 'beef', 'milk', 'butter', 'cheese', 'onion', 'broccoli', 'flour', 'tomato', 'garlic'];
    const booleans: Array<boolean> = new Array(ingredients.length).fill(false);
    const [state, setState] = React.useState(booleans);

    // To toggle each checkbox
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let temp_state = [...state];
        temp_state[ingredients.indexOf(event.target.name)] = (state[ingredients.indexOf(event.target.name)] ? false : true);
        setState(temp_state);
        dispatch(changeSelectedIngredients(temp_state));
    };

    return (<div className='SearchForm'>
        <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 3, flexGrow: 1 }} component="fieldset" variant="standard">
                <FormGroup row={true}>
                    {ingredients.map((data, i) =>
                        <FormControlLabel key={i}
                            control={
                                <Checkbox checked={state[i]} onChange={handleChange} name={ingredients[i]} />
                            }
                            label={ingredients[i]}
                        />)}
                </FormGroup>
            </FormControl>
        </Box >
    </div>);
}
