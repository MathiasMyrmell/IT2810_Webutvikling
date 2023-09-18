import * as React from "react";
import "./RecipeCard.css";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import {
  Collapse,
  Typography,
  CardActionArea,
  CardHeader,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { RecipeData } from "../../Page/Home/Home";
import { useAppSelector } from "../../Redux/hooks";
import { useEffect } from "react";
import { RecipeContainer } from "../MuiElements/muiElements";
import { useLazyQuery } from "@apollo/client";
import { GET_RECIPE_INFORMATION } from "../../Api/queries";
import { v4 as uuid } from 'uuid';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
// To open the recipe items
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeCard(props: RecipeData) {
  const [expanded, setExpanded] = React.useState(false);
  const selected = useAppSelector((state) => state.sort);
  const [recipeInformation, { loading, error, data }] = useLazyQuery(GET_RECIPE_INFORMATION, {
    variables: { title: props.title },
  });
  
  

  useEffect(() => {
    setExpanded(false);
  }, [selected]);

  function handleExpandClick() {
    recipeInformation();

    setExpanded(!expanded);
  }

  return (
    <RecipeContainer>
      <CardContent>
        <CardHeader
          titleTypographyProps={{ variant: "h4" }}
          title={props.title}
        />
      </CardContent>
      {/* Button to click */}
      <CardActionArea onClick={handleExpandClick}>
        <CardContent sx={{ backgroundColor: "#c66a00" }}>
          <Typography paragraph>Click for more information</Typography>
        </CardContent>
      </CardActionArea>
      {/* When clicked, shows all the information */}
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{ backgroundColor: "#ffb768" }}
      >
        <CardContent sx={{ overflowY: "scroll", maxHeight: 400 }}>
          {loading ? (
            <>
              <CircularProgress color="inherit" />
            </>
          ) : (
            <>
              <Typography paragraph>Ingredients:</Typography>
              <ul>
                {data?.recipes[0]?.ingredients?.map((ingredient: string) => (
                  <li key={uuid()}>{ingredient}</li>
                ))}
              </ul>
              <Typography paragraph>Method:</Typography>
              <div className="directions">
                {data?.recipes[0]?.directions?.map((direction: string) => (
                  <p key={direction}>{direction} </p>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Collapse>
    </RecipeContainer>
  );
}
