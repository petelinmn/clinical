import './Grid.css';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { fetchListData } from '../dataFetchService';
import { IDataItem } from '../Types'

interface IGridParams {
  text: string
}

function Grid() {
  const params = useParams<IGridParams>();
  const [data, setData] = useState<IDataItem[][]>([]);
  useEffect(() => {
    const maxList: number = 10;
    let isCancelled: boolean = false;
    fetchListData(params.text, maxList).then(result => {
      if (!isCancelled) {
        setData(result);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [params.text]);

  return (
    <div className="grid">
      <div className="grid-content">
        {data?.map((item, i) => {
          const [npi, providerType, gender, name, addrPractice, country] = item.map((i: { value: string; }) => i.value);
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
