import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import getConfig from 'next/config';
import { uriUpload } from '../config';

const { publicRuntimeConfig } = getConfig();
const { uriUploadCloudinary } = publicRuntimeConfig;

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION($title: String!, $description: String!, $image: String!, $largeImage: String!) {
    createItem(title: $title, description: $description, image: $image, largeImage: $largeImage) {
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
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'shop-react');
    const res = await fetch(uriUploadCloudinary, { method: 'POST', body: data });
    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  render() {
    const { title, price, image, description, largeImage } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={{ title, price, image, description, largeImage }}>
        {(createItem, { loading, error }) => (
          <form
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              console.log('Previo a await', this.state);
              const res = await createItem();
              console.log(res);
              // Router.push({
              //   pathname: '/item',
              //   query: { id: res.data.createItem.id },
              // });
            }}
          >
            {/* <Error error={error} /> */}
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                File
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="upload an image..."
                  onChange={this.uploadFile}
                  required
                />
                {image && <img src={image} alt="Preview" />}
              </label>

              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  onChange={this.handleChange}
                  required
                  value={title}
                />
              </label>

              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  onChange={this.handleChange}
                  required
                  value={price}
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  onChange={this.handleChange}
                  required
                  value={description}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
