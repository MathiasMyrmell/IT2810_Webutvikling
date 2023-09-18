import * as React from "react";
import "./BasicPagination.css";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { changeCurrentPage } from "../../Redux/sortSlice";
import { StyledEngineProvider } from "@mui/material/styles";
import { CustomPagination } from "../MuiElements/muiElements";

// Typing props
export interface pageProp { 
  recipesPerPage: number;
  totalRecipe: number; 
}

export default function BasicPagination(props: pageProp) {
  // Redux
  const selected = useAppSelector((state) => state.sort);
  const dispatch = useAppDispatch();


  const pageNumbers = [];
  const numPages = Math.ceil(props.totalRecipe / props.recipesPerPage);
  // Calulate the number of pages
  for (
    let i = 1;
    i <= Math.ceil(props.totalRecipe / props.recipesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const pageChangeHandler = (pageNumber: number) => {
    dispatch(changeCurrentPage(pageNumber));
  };

  return (
    <div className="BasicPagination">
      <StyledEngineProvider injectFirst>
        <CustomPagination
          page={selected.currentPage}
          count={numPages}
          size="large"
          variant="outlined"
          onChange={(event, pageNumber) => pageChangeHandler(pageNumber)}
        />
      </StyledEngineProvider>
    </div>
  );
}
