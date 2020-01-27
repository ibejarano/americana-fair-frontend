import React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import getConfig from 'next/config';
import Router from 'next/router';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const {publicRuntimeConfig} = getConfig();
const {uriUploadCloudinary} = publicRuntimeConfig;

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String!
    $largeImage: String!
    $price: Int!
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
      title
    }
  }
`;

class CreateItem extends React.Component {
  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  handleChange = e => {
    const {name, type, value} = e.target;
    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({[name]: val});
  };

  uploadFile = async e => {
    const {files} = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'shop-react');
    console.log(uriUploadCloudinary);
    const res = await fetch(uriUploadCloudinary, {method: 'POST', body: data});
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  render() {
    const {title, price, image, description, largeImage} = this.state;
    return (
      <Mutation
        mutation={CREATE_ITEM_MUTATION}
        variables={{title, price, image, description, largeImage}}>
        {(createItem, {loading, error}) => (
          <Form
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              const {data} = await createItem();
              Router.push({
                pathname: '/item',
                query: {id: data.createItem.id},
              });
            }}>
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <div className="image-wrapper">
                <label htmlFor="file">
                  Imagen
                  <input
                    type="file"
                    id="file"
                    name="file"
                    placeholder="Seleccione una imagen .jpg o .png"
                    onChange={this.uploadFile}
                    required
                  />
                  {image && <img src={image} alt="Preview" />}
                </label>
              </div>

              <div className="form-data-wrapper">
                <label htmlFor="title">
                  Titulo
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Titulo"
                    onChange={this.handleChange}
                    required
                    value={title}
                  />
                </label>

                <label htmlFor="price">
                  Precio
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Precio"
                    onChange={this.handleChange}
                    required
                    value={price}
                  />
                </label>

                <label htmlFor="description">
                  Descripcion
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Descripcion"
                    onChange={this.handleChange}
                    required
                    value={description}
                  />
                </label>
                <button type="submit">Submit</button>
              </div>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
