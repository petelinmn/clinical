import './Card.css';
import { useParams } from 'react-router-dom';
import { fetchCardData } from '../dataFetchService';
import { useState, useEffect } from 'react';

function Card() {
  const params = useParams();
  const [data, setData] = useState('');
  useEffect(() => {
    let isCancelled = false;
    fetchCardData(params.npi).then(result => {
      if (!isCancelled) {
        setData(result.filter(item => item.value[0] !== '{'));
      }
    });

    return () => {
      isCancelled = true;
    };
  });

  if (!data) {
    return (
      <div className="card">
        loading...
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-content">
        {data.map((item, index) => {
          return (
            <div className={"card-Card"} key={index}>
              <div className={"card-Card-fieldCaption"}>{item.caption}</div>
              {item.value ? item.value : 'N/A'}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
