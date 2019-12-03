import React, { Component } from 'react';
import './assets/css/main.css';
import ImageItem from './Components/ImageItem';
import Footer from './Components/Footer';
import { parseString } from 'xml2js';
import ImageModal from './Components/ImageModal';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testing: true,
      images: [],
      showContactPanel: false,
      showImageModal: false
    }
  }
  
  toggleContactPanel() {
    this.setState({ showContactPanel: !this.state.showContactPanel });
  }

  closeContactPanel() {
    this.setState({ showContactPanel: false });
  }

  // clicking on an image should ensure the contact panel is closed
  imageClicked(index) {
    if (this.state.showContactPanel) {
      this.toggleContactPanel();
    }
    else {
      this.setState({
        showImageModal: !this.state.showImageModal,
        imageToShow: index
      });
      console.log(this.state.showImageModal);
    }
  }

  closeImageModal() {
    this.setState({ showImageModal: false });
  }

  componentWillMount() {
    axios.get(`https://pixabay.com/api/?key=14471226-1404c6f1117ad2fdad8fc6199&q=yellow+flowers&image_type=photo&pretty=true`)
    .then((response)=>{
        console.log(response);
        this.setState({images: response.data.hits})
        // console.log(this.state.images);
    })
    .catch(function (error) {
        // console.log(`${api.tickets.baseUrl}/collections`);
        console.log(error);
    })
  }

  render() {
    return (
      <div id="wrapper">
        <header id="header">
          <h1><a href="index.html"><strong>Multiverse</strong> by HTML5 UP</a></h1>
          <nav>
            <ul>
              <li
                onClick={this.toggleContactPanel.bind(this)}>
                <a href="#footer" className="icon fa-info-circle">
                  About
              </a>
              </li>
            </ul>
          </nav>
        </header>

        <div id="main">
          {
            this.state.images.map((image, index) => (
              <ImageItem
                key={index}
                src={image.largeImageURL}
                source_url={image.largeImageURL}
                duration={index}
                test={false}
                onClick={this.imageClicked.bind(this, index)}
                blur={this.state.showImageModal}
              />
            ))
          }
        </div>
        <Footer
          show={this.state.showContactPanel}
          close={this.toggleContactPanel.bind(this)}
          closeCallback={this.closeContactPanel.bind(this)}
        />

        <ImageModal
          show={this.state.showImageModal}
          imageToShow={this.state.imageToShow}
          images={this.state.images}
          closeCallback={this.closeImageModal.bind(this)} />

      </div>
    );
  }
}

export default App;
