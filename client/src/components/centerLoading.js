import React from 'react';
import {Spinner} from "react-spinkit"

const CenterLoading = (props) => (
  <div className="row">
    <div className="col-xs-12 col-sm-2 col-md-3"></div>
      <div className="col-sm-8 col-md-6">
          <Spinner name="wandering-cubes" color="gold"/>
      </div>
    <div className="col-xs-12 col-sm-2 col-md-3"></div>
  </div>
)

export default CenterLoading;