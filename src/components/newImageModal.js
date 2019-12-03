import React, { Component } from "react";
// import { render } from "react-dom";
import Lightbox from "react-image-lightbox";
// import "react-image-lightbox/style.css";
import axios from "axios";
import Carousel from 'react-images';

class NewImageModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
      images: []
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    this.setState({
        images: nextProps.images,
        imageToShow: nextProps.imageToShow,
        nextImageToShow: undefined,
        show: nextProps.show,
        pictureShown: nextProps.show
    });
    // debugger
}
  // componentWillMount() {
  //   // debugger
  //   console.log('====================================')
  //   console.log(this.props)
  //   console.log('====================================')
  // }
  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
        {/* <button type="button" onClick={() => this.setState({ isOpen: true })}>
          Open Lightbox
        </button> */}
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

export default NewImageModal;
