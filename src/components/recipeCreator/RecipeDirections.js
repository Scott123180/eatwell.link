import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';


const RecipeDirections = (props) => {

    const directionItems = props.directions.map((direction, index) => (
            <ListItem>
                <ListItemIcon>
                    <DeleteIcon onClick={() => props.deleteDirectionCallBack(index)}/>
                </ListItemIcon>
                <TextField 
                variant="standard" 
                value={direction} 
                onChange={(event) => props.updateDirectionCallBack(index, event.target.value)}
                />
            </ListItem>
    ));

    return (
        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Directions
            </Typography>
            <List>
                {directionItems}
            </List>
            <AddBoxIcon onClick={() => props.addDirectionCallBack()} />
        </Grid>
    );

}

export default RecipeDirections;