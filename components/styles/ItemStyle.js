import styled from 'styled-components';

// consist on and image
// price
// title
// add to cart button
// delete button
// edit button

const ItemStyles = styled.li`
  background: grey;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  width: 30%;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    font-size: 1rem;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid black;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: red;
    & > * {
      background: yellow;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;

export default ItemStyles;
