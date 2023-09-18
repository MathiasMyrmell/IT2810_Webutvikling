import * as React from 'react';
import './RecipeCard.css';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Collapse, Typography, CardActionArea, CardHeader, CardContent, CardActions, Card, ListItem, List } from '@mui/material'
import { RecipeData } from './Home';
import { useAppSelector, useAppDispatch } from '../Redux/hooks';
import { useEffect } from 'react';


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
// To open the recipe items
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export default function RecipeCard(props: RecipeData) {
    const [expanded, setExpanded] = React.useState(false);
    const selected = useAppSelector(state => state.sort);

    useEffect(() => {
        setExpanded(false);
    }, [selected]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 600, mt: 2, backgroundColor: '#FF9900', color: 'black' }}>
            <CardContent>
                <CardHeader titleTypographyProps={{ variant: 'h4' }}
                    title={props.title}
                />
            </CardContent>
            {/* Button to click */}
            <CardActionArea onClick={handleExpandClick}>
                <CardContent sx={{ backgroundColor: '#c66a00' }}>
                    <Typography paragraph>Click for more information</Typography>
                </CardContent>
            </CardActionArea >
            {/* When clicked, shows all the information */}
            <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ backgroundColor: '#ffb768' }}>
                <CardContent>
                    <Typography paragraph>Ingredients:</Typography>
                    <ul>
                        {props.ingredients.map((data, i) => <li key={i}>{data}</li>)}
                    </ul>
                    <Typography paragraph>Method:</Typography>
                    <div className='directions'>
                        {props.directions.map((data, i) => <p key={i}>{data} </p>)}
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    );
}
