import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface RecipeState {
  sorted: string
  currentPage: number
  title: string
  selectedIngredients: Array<string>
}
// Define the initial state using that type
const initialState: RecipeState = {
  sorted: "ASC",
  currentPage: 1,
  title: '',
  selectedIngredients: []
}

function capitalizeFirstLetter(string: string) {
  const words = string.split(" ").map(s => s.charAt(0).toUpperCase() + s.slice(1));
  return words.join(" ");
}


const ingredients: Array<string> = ['chicken', 'beef', 'milk', 'butter', 'cheese', 'onion', 'broccoli', 'flour', 'tomato', 'garlic'];

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    changeSorted: (state, i) => {
      if (i.payload == 'A-Z') {
        state.sorted = 'ASC';
      } else if (i.payload == 'Z-A') {
        state.sorted = 'DESC';
      }
    },
    changeCurrentPage: (state, i) => {
      state.currentPage = i.payload;
    },
    changeSearchTitle: (state, i) => {
      state.title = capitalizeFirstLetter(i.payload);
      state.currentPage = 1;
    },
    changeSelectedIngredients: (state, i) => {
      // Check after checked ingredients
      state.currentPage = 1;
      let result = i.payload.map((element: boolean, i: number) => {
        return element ? ingredients[i] : ""
      }).filter(String);
      state.selectedIngredients = result;
    }

  }
})

// Action creators are generated for each case reducer function
export const { changeSorted, changeCurrentPage, changeSearchTitle, changeSelectedIngredients } = sortSlice.actions

export default sortSlice.reducer

