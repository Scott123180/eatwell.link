import React from 'react';
import { graphql } from 'gatsby';
import IngredientTable from '../components/IngredientTable';
import Grid from '@mui/material/Grid';
import Layout from '../components/Layout';
import { FormGroup, Typography, Switch, Stack } from '@mui/material';

const RecipeLinkElement = ({link}) =>{

  if(link !== null && link !== "") {
    return <p><a href={link} target="_blank" rel="noreferrer">Inspiring Recipe</a></p>
  }

  return <div></div>;

}

class Recipe extends React.Component{

  constructor() {
    super();

    this.state = {
      shoppingModeToggled: false,
      shoppingProvider: 'Amazon Fresh'
    };
  }

  updateShoppingState = (value) => {
    this.updateState("shoppingModeToggled", value);
  }
  
  updateState = (key,value) => {
      this.setState({[[key]]: value});
  }


  render(){
    const data = this.props.data;
    const post = data.markdownRemark;

    const ingredientList = post.frontmatter.ingredients;
    
    const mapBySection = new Map();

    ingredientList.forEach((i) =>{
      const key = i.section;
      const value = mapBySection.get(key);
      if(value === undefined){
        mapBySection.set(key, [i]);
      } else {
        value.push(i);
      }
    });

    const out = [];
    mapBySection.forEach((key, value) => {
      out.push(
        <Grid container spacing = {2} className="ingredients">
          <Grid item xs = {1} md={2}/>
          <Grid item xs = {10} md={8}>
            <IngredientTable data={mapBySection.get(value)}/>
          </Grid>
          <Grid item xs = {1} md={2} />
        </Grid>
      )
    });

    const ingredients = (
      <div>
        {out}
      </div>
    );

    const directionList = post.frontmatter.directions;
    const directions = (
      <ol>
        {
          directionList.map((i) => {
            return React.createElement(
              "li",
              {className:"direction"},
              i
            );
          })
        }

      </ol>
    );

    const originalRecipeLink = post.frontmatter.originalLink;

    return (
      <Layout>
        <div className="post-page-container">
          <div className="post-page-flex-container">
            <div className="post-content-container">
              <h1>{post.frontmatter.title}</h1>
              <h4 style={{color: 'rgb(165, 164, 164)', fontSize: '0.8em'}}>Published: {post.frontmatter.date} | Total Time: {post.frontmatter.totalTime}</h4>
              
              <FormGroup>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Shopping Mode</Typography>
                  <Switch label="Shopping Mode" onChange={(event, value) => this.updateShoppingState(value)} />
                </Stack>
              </FormGroup>

              <h4>Ingredients</h4>
              {ingredients}

              <h4>Directions</h4>
              {directions}

              <div dangerouslySetInnerHTML = {{ __html: post.html }}/>
              <RecipeLinkElement link={post.frontmatter.originalLink} />
            </div>
          </div>
          
        </div>
      </Layout>
    );

  }

} 

export default Recipe;

export const query = graphql`query PostQuery($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    frontmatter {
      title
      date
      prepTime
      cookingTime
      totalTime
      originalLink
      ingredients {
        name
        amount
        unit
        section
      }
      directions
    }
  }
}`;