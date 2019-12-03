import React, { Component } from 'react';
import { fadeIn } from 'react-animations'
import { StyleSheet, css } from 'aphrodite';
import { Motion, spring } from 'react-motion';


class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: StyleSheet.create({
                fadeIn: {
                    animationName: fadeIn,
                    animationDuration: props.duration + 's'
                },
                blur: 0
            })
        };
    }

    render() {
        let imgSrc = this.props.src;
        if (this.props.test) {
            imgSrc = "images/fulls/01.jpg"
        }
        return (
            <Motion
                style={{
                    blur: spring(this.props.blur ? 1 : 0, { stiffness: 170, damping: 17 }),
                }}>
                {({ blur }) =>
                    <article className="thumb"
                        ref={(component) => this.myComponent = component}
                        onClick={this.props.onClick}>
                        <a className={"image " + css(this.state.styles.fadeIn)}
                            style={{
                                backgroundImage: `url(${imgSrc})`,
                                cursor: 'pointer',
                                filter: `blur(${blur * 5}px)`
                            }}>
                        </a>
                        <h2
                        style={{
                            fontFamily: "'Roboto', sans-serif"
                        }}>
                        {this.props.source_url}</h2>
                    </article>
                }
            </Motion>
        )
    }
}

export default ImageItem;