import React, { Component } from "react";
import { render } from "react-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import axios from "axios";
const images = [
  "//placekitten.com/1500/500",
  "//placekitten.com/4000/3000",
  "//placekitten.com/800/1200",
  "//placekitten.com/1500/1500"
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
      images: []
    };
  }

  componentWillMount() {
    axios
      .get(
        `https://pixabay.com/api/?key=14471226-1404c6f1117ad2fdad8fc6199&q=yellow+flowers&image_type=photo&pretty=true`
      )
      .then(response => {
        console.log(response);
        this.setState({ images: response.data.hits });
        // console.log(this.state.images);
      })
      .catch(function(error) {
        // console.log(`${api.tickets.baseUrl}/collections`);
        console.log(error);
      });
  }
  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
        <button type="button" onClick={() => this.setState({ isOpen: true })}>
          Open Lightbox
        </button>

        {isOpen && (
          <Lightbox
            mainSrc={this.state.images[photoIndex].largeImageURL}
            nextSrc={
              this.state.images[(photoIndex + 1) % this.state.images.length]
                .largeImageURL
            }
            prevSrc={
              this.state.images[
                (photoIndex + this.state.images.length - 1) %
                  this.state.images.length
              ]
            }
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex:
                  (photoIndex + this.state.images.length - 1) %
                  this.state.images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % this.state.images.length
              })
            }
          />
        )}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
