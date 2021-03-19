import './Grid.css';
import fieldDefinitions from '../fieldDefinitions.json'
import { useState } from 'react';

function Grid(props) {
  return (
    <div className="grid">
        <div className="grid-content">
          {props.data.map(item =>
          <div className="grid-gridCard">
            <div>{item[1]}</div>
            <div className="grid-gridCard-primaryColumn">
              <a href="#">{item[3]}</a>
              <div className="grid-gridCard-primaryColumn-rightText">{item[2] == 'F' ? 'Female' : 'Male'}</div>
            </div>
            <div>{item[39]}, {item[4]}</div>
          </div>)}
        </div>
    </div>
  );
}


export default Grid;
