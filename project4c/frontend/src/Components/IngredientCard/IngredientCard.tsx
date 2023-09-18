import {
  CommonButton,
  Ingredient,
  IngredientText,
} from "../MuiElements/muiElements";

export interface ingredientProp {
  key: String;
  ingredient: String;
  handleClick: (ingredient: String) => void;
}

function IngredientCard(props: ingredientProp) {
  return (
    <Ingredient>
      <IngredientText className="ingredientText">
        {props.ingredient}
      </IngredientText>
      <CommonButton onClick={() => props.handleClick(props.ingredient)} className="removeButton">Remove</CommonButton>
    </Ingredient>
  );
}

export default IngredientCard; 
