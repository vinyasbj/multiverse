import React, { Component } from 'react';
import { slideInUp, slideOutDown } from 'react-animations'
import { StyleSheet, css } from 'aphrodite';
import MdClose from 'react-icons/lib/md/close';
import { Motion, spring } from 'react-motion';

const styles = StyleSheet.create({
    baseStyle: {
        background: `rgba(36, 38, 41, 0.975)`,
        bottom: `4em`,
        left: 0,
        maxHeight: `calc(80vh - 4em)`,
        overflowY: `auto`,
        position: `fixed`,
        width: `100%`,
    },

    slideInUp: {
        animationName: slideInUp,
        animationDuration: '1s'
    },
    slideOutDown: {
        animationName: slideOutDown,
        animationDuration: '1s'
    }
});


class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: 'panel',
            closeActive: false,
            show: false
        }
    }


    clickHandler(name, proxy, event) {
        proxy.stopPropagation();
        switch (name) {
            case 'close':
                this.close();
                break;
            default:
                console.log('error');
                break;
        };
    }

    handleMouseEnter(name) {
        switch (name) {
            case 'close':
                this.setState({ closeActive: true });
                break;
            default:
                console.log('error');
                break;
        }
    }

    handleMouseLeave(name) {
        switch (name) {
            case 'close':
                this.setState({ closeActive: false });
                break;
            default:
                console.log('error');
                break;
        }
    }

    close() {
        this.setState({ className: 'panel' }),
        this.props.closeCallback();
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.show)) {
            this.setState({ className: 'panel active' });
        }
        else if ((!nextProps.show)) {
            this.setState({ className: 'panel' })
        }
    }

    render() {
        return (
            <Motion
                style={{
                    closeOpacity: spring(this.state.closeActive ? 1 : .5),
                }}>
                {({ closeOpacity }) =>
                    <footer id="footer" className={this.state.className}>
                        <div className="inner split">
                            <div>
                                <section>
                                    <h2>Magna feugiat sed adipiscing</h2>
                                    <p>Nulla consequat, ex ut suscipit rutrum, mi dolor tincidunt erat, et scelerisque turpis ipsum eget quis orci mattis aliquet. Maecenas fringilla et ante at lorem et ipsum. Dolor nulla eu bibendum sapien. Donec non pharetra dui. Nulla consequat, ex ut suscipit rutrum, mi dolor tincidunt erat, et scelerisque turpis ipsum.</p>
                                </section>
                                <section>
                                    <h2>Follow me on ...</h2>
                                    <ul className="icons">
                                        <li><a className="icon fa-twitter"><span className="label">Twitter</span></a></li>
                                        <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                                        <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                                        <li><a href="#" className="icon fa-github"><span className="label">GitHub</span></a></li>
                                        <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
                                        <li><a href="#" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
                                    </ul>
                                </section>
                                <p className="copyright">
                                    &copy; Unttled. Design: <a href="http://html5up.net">HTML5 UP</a>.
								</p>
                            </div>
                            <div>
                                <section>
                                    <h2>Get in touch</h2>
                                    <form method="post" action="#">
                                        <div className="field half first">
                                            <input type="text" name="name" id="name" placeholder="Name" />
                                        </div>
                                        <div className="field half">
                                            <input type="text" name="email" id="email" placeholder="Email" />
                                        </div>
                                        <div className="field">
                                            <textarea name="message" id="message" rows="4" placeholder="Message"></textarea>
                                        </div>
                                        <ul className="actions">
                                            <li><input type="submit" value="Send" className="special" /></li>
                                            <li><input type="reset" value="Reset" /></li>
                                        </ul>
                                    </form>
                                </section>
                            </div>
                        </div>
                        <MdClose size={32}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                opacity: closeOpacity,
                                color: `white`
                            }}
                            onMouseEnter={this.handleMouseEnter.bind(this, 'close')}
                            onMouseLeave={this.handleMouseLeave.bind(this, 'close')}
                            onClick={this.clickHandler.bind(this, 'close')}
                        />
                    </footer>
                }
            </Motion>
        )
    }
}

export default Footer;