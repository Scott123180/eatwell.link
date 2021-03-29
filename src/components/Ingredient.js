import React from "react"
import { graphql } from "gatsby"

const Ingredient = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  {
    currentCsv(ndbNo: {eq: $foodId}) {
      ndbNo
      shrtDesc
      energKcal
      proteinG
      carbG
      fiberTdG
      sugarTotG
      potassiumMg
      sodiumMg
      fatSatG
      fatMonoG
      fatPolyG
      cholestrlMg
      gmWt1
      gmWt1Desc
      gmWt2
      gmWt2Desc
      myPlateFoodGroup
      foodCategory
      myPlateServingSize
      name
    }
  }
`

export default Ingredient