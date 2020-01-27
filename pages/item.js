import Reacr from 'react';
import SingleItem from '../components/SingleItem';

const ItemPage = ({query}) => {
  return (
    <div>
      <SingleItem id={query.id} />
    </div>
  );
};

export default ItemPage;
