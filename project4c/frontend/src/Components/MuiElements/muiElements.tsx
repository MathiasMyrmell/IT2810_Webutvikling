import { Button, Card, Pagination, styled, TextField } from "@mui/material";


export const InputField = styled(TextField)({
    background: 'white',
    maxWidth: '300px',
    fontSize: "clamp(12px, 5vw, 18px)",
});

export const CommonButton = styled(Button)({
    backgroundColor: '#FF9900',
    color: 'black',
    fontWeight: 'bold',
    fontSize: "clamp(12px, 5vw, 10px)",
    '&:hover': { backgroundColor: '#c66a00', }
});

export const SearchCard = styled(Card)({
   minWidth: '275px',
   backgroundColor: '#F8F8F8',
});

export const RecipeContainer = styled(Card)({
    maxWidth: '100%',
    mt: '2',
    backgroundColor: '#FF9900',
    color: 'black',
});

export const CustomPagination = styled(Pagination)({
    '& .MuiPaginationItem-root': {
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
    },}
});

export const Ingredient = styled(Card)({
    maxWidth: '288px',
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px',
    border: '1px solid black',
    margin: '5px 0',
});

export const IngredientText = styled(Card)({
    maxWidth: '200px',
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: "clamp(12px, 5vw, 18px)",
    boxShadow: 'none',
    paddingTop: '6px',
});
