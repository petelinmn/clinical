import './Grid.css';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchListData } from '../dataFetchService';

function Grid() {
  const params = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const maxList = 10;
    let isCancelled = false;
    fetchListData(params.text, maxList).then(result => {
      if (!isCancelled) {
        setData(result);
      }
    });

    return () => {
      isCancelled = true;
    };
  });

  return !data ? null : (
    <div className="grid">
      <div className="grid-content">
        {data.map((item, i) => {
          const [npi, providerType, gender, name, addrPractice, country] = item;
          return (
            <div key={i} className="grid-gridCard">
              <div>{providerType}</div>
              <div className="grid-gridCard-primaryColumn">
                <Link to={`/card/${npi}`}>{name}</Link>
                <div className="grid-gridCard-primaryColumn-rightText">{gender === 'F' ? 'Female' : 'Male'}</div>
              </div>
              <div>{country}, {addrPractice}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Grid;
