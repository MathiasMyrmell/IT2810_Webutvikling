import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { makeStyles } from "@material-ui/core/styles";
import { useAppSelector, useAppDispatch } from '../Redux/hooks';
import { changeCurrentPage } from '../Redux/sortSlice';

// For styling
const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            background: '#fff3e0',
            color: "black",

            '&.Mui-selected': {
                background: '#ff9800',
                color: 'black',
                borderRadius: '50%',
            },
            '&:hover': {
                backgroundColor: '#c66a00',
                color: 'black',
                borderRadius: '50%',
            },
        }

    }
}));

// Typing props
export interface pageProp {
    recipesPerPage: number,
    totalRecipe: number
}

export default function BasicPagination(props: pageProp) {
    // Redux
    const selected = useAppSelector(state => state.sort);
    const dispatch = useAppDispatch();
    const classes = useStyles();

    const pageNumbers = [];
    const numPages = Math.ceil(props.totalRecipe / props.recipesPerPage);
    // Calulate the number of pages
    for (let i = 1; i <= Math.ceil(props.totalRecipe / props.recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    const pageChangeHandler = (pageNumber: number) => {
        dispatch(changeCurrentPage(pageNumber));
    }

    return (
        <div className='BasicPagination'>
            <Stack spacing={2}>
                <Pagination page={selected.currentPage} count={numPages} variant="outlined" size='large' classes={{ ul: classes.ul }} onChange={(event, pageNumber) => pageChangeHandler(pageNumber)} />
            </Stack>
        </div>
    );
}