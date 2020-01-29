import styled from 'styled-components';

// consist on and image
// price
// title
// add to cart button
// delete button
// edit button

const ItemStyles = styled.li`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 70%;

  img {
    object-fit: cover;
    max-width: 300px;
    flex-grow: 2;
  }

  .item-text {
    font-size: 2rem;
    font-weight: 300;
    flex-grow: 3;
    padding: 1em;
  }

  .buttonList {
    display: grid;
    border-left: 1px solid black;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    & > * {
      border: 0;
      font-size: 1em;
      padding: 0.1em;
    }
  }
`;

export default ItemStyles;
