import React from 'react';
import './App.css';
import './assets/css/main.css';
import axios from 'axios';
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      images: []
    }
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
  render(){
  return (
      <div id="wrapper">
      <header id="header">
        <h1><a href="index.html"><strong>Multiverse</strong> by HTML5 UP</a></h1>
        <nav>
          <ul>
            <li><a href="footer" className="icon fa-info-circle">About</a></li>
          </ul>
        </nav>
      </header>
    <div id="main">
    {this.state.images.map(image => {
        return <article className="thumb">
        <a href={image.largeImageURL} className="image"><img src={image.webformatURL} alt="" /></a>
        <h2>Magna feugiat lorem</h2>
        <p>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
      </article>
    })}
    </div>

    <footer id="footer" className="panel">
      <div className="inner split">
        <div>
          <section>
            <h2>Magna feugiat sed adipiscing</h2>
            <p>Nulla consequat, ex ut suscipit rutrum, mi dolor tincidunt erat, et scelerisque turpis ipsum eget quis orci mattis aliquet. Maecenas fringilla et ante at lorem et ipsum. Dolor nulla eu bibendum sapien. Donec non pharetra dui. Nulla consequat, ex ut suscipit rutrum, mi dolor tincidunt erat, et scelerisque turpis ipsum.</p>
          </section>
          <section>
            <h2>Follow me on ...</h2>
            <ul className="icons">
              {/* <li><a href="" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
              <li><a href="" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
              <li><a href="" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
              <li><a href="" className="icon fa-github"><span className="label">GitHub</span></a></li>
              <li><a href="" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
              <li><a href="" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li> */}
            </ul>
          </section>
          <p className="copyright">
            &copy; Unttled. Design: <a href="http://html5up.net">HTML5 UP</a>.
          </p>
        </div>
        <div>
          <section>
            <h2>Get in touch</h2>
            <form method="post" action="">
              <div className="fields">
                <div className="field half">
                  <input type="text" name="name" id="name" placeholder="Name" />
                </div>
                <div className="field half">
                  <input type="text" name="email" id="email" placeholder="Email" />
                </div>
                <div className="field">
                  <textarea name="message" id="message" rows="4" placeholder="Message"></textarea>
                </div>
              </div>
              <ul className="actions">
                <li><input type="submit" value="Send" className="primary" /></li>
                <li><input type="reset" value="Reset" /></li>
              </ul>
            </form>
          </section>
        </div>
      </div>
    </footer>
</div>
  );
  }
}

export default App;
