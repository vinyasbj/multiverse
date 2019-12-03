import React from 'react';
import  {spring,Motion }from 'react-motion';
import Img from 'react-image';
import Loader from 'react-loader';
import MdChevronRight from 'react-icons/md/index';
import MdChevronLeft from 'react-icons/md/index';
import MdClose from 'react-icons/md/index';

class ImageModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leftActive: false,
            rightActive: false,
            closeActive: false,
            show: false,
            imageToShow: undefined,
            nextImageToShow: undefined,
            images: [],
            showCaption: false,
            pictureShown: false
        }
    }

    clickHandler(name, proxy, event) {
        proxy.stopPropagation();
        switch (name) {
            case 'left':
                this.setState({ showPicture: false });
                let nextImageToShowLeft = this.state.imageToShow === 0 ?
                    this.state.images.length - 1 :
                    (this.state.imageToShow - 1) % this.state.images.length
                this.setState({
                    nextImageToShow: nextImageToShowLeft
                });
                this.swapImages(this.state.imageToShow, nextImageToShowLeft);
                break;
            case 'right':
                this.setState({ showPicture: false });
                let nextImageToShowRight = (this.state.imageToShow + 1) % this.state.images.length

                this.setState({
                    nextImageToShow: nextImageToShowRight
                });
                this.swapImages(this.state.imageToShow, nextImageToShowRight);
                break;
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
            case 'left':
                this.setState({ leftActive: true });
                break;
            case 'right':
                this.setState({ rightActive: true });
                break;
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
            case 'left':
                this.setState({ leftActive: false });
                break;
            case 'right':
                this.setState({ rightActive: false });
                break;
            case 'close':
                this.setState({ closeActive: false });
                break;
            default:
                console.log('error');
                break;
        }
    }

    close() {
        this.setState({
            show: false,
            showCaption: false,
            pictureShown: false
        });
        this.props.closeCallback();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            images: nextProps.images,
            imageToShow: nextProps.imageToShow,
            nextImageToShow: undefined,
            show: nextProps.show,
            pictureShown: nextProps.show
        });
        debugger
    }

    animationComplete(a, b, c) {
        console.log('animation complete');
        // debugger;
        if ((this.state.show) && (!this.state.showCaption)) {
            this.raf = requestAnimationFrame(() => this.setState({ showCaption: true }));
        }
        else if ((this.state.show) && (!this.state.pictureShown)) {
            this.raf = requestAnimationFrame(() => this.setState({
                imageToShow: this.state.nextImageToShow,
                pictureShown: true
            }));
        }
    }


    swapImages(currentPictureIndex, nextPictureIndex) {
        console.log(`swapping images: ${currentPictureIndex} => ${nextPictureIndex}`);
        debugger;
        this.setState({ pictureShown: false });
        //this.setState({ imageToShow: nextPictureIndex });
    }

    render() {
        return ( 
            <div>
            <Motion
                style={{
                    top: spring(this.state.show ? 0 : 50),
                    left: spring(this.state.show ? 0 : 50),
                    bottom: spring(this.state.show ? 0 : 50),
                    right: spring(this.state.show ? 0 : 50),
                    imageVerticalScale: spring(this.state.pictureShown ? 1 : 0),
                    imageHorizontalScale: spring(this.state.pictureShown ? 1 : 0),
                    captionOpacity: spring(this.state.showCaption ? 1 : 0),
                    captionScale: spring(this.state.showCaption ? 1 : 0),
                    leftOpacity: spring(this.state.leftActive ? 1 : .5),
                    rightOpacity: spring(this.state.rightActive ? 1 : .5),
                    closeOpacity: spring(this.state.closeActive ? 1 : .5),
                }}
                onRest={this.animationComplete.bind(this)}>
                {({ top, left, bottom, right, imageVerticalScale, imageHorizontalScale,  
                    captionOpacity, captionScale, leftOpacity, rightOpacity, closeOpacity }) =>
                    <div id='imageModal'
                        style={{
                            zIndex: 100,
                            position: 'fixed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: top + '%',
                            right: right + '%',
                            bottom: bottom + '%',
                            left: left + '%',
                        }}
                        onClick={this.close.bind(this)}>
                        <div id='pictureContainer'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: `scale(${imageVerticalScale}, ${imageHorizontalScale})`,
                                maxWidth: '75%',
                                maxHeight: '75%',
                                minWidth: '33%',
                                minHeight: '33%',
                                boxShadow: `0px 0px 5px 1px rgba(0,0, 10, 7, .75) inset`,
                                backgroundImage: `url(${this.state.imageToShow !== undefined ?
                                    this.state.images[this.state.imageToShow].webformatURL :
                                    `images/fulls/01.jpg`})`,
                                backgroundSize: 'cover',
                            }}>
                            <div className="closer"
                                style={{
                                    position: 'absolute',
                                    left: '0px',
                                    top: '0px',
                                    width: '40px',
                                    height: '40px',
                                }}></div>
                            <Img
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    visibility: `hidden`
                                }}
                                src={
                                    this.state.imageToShow !== undefined ?
                                        this.state.images[this.state.imageToShow].webformatURL :
                                        null
                                }
                                loader={<Loader />}
                            />
                            <div className='caption'
                                style={{
                                    color: 'white',
                                    width: '100%',
                                    position: 'absolute',
                                    bottom: '0',
                                    opacity: captionOpacity,
                                    transform: `scale(${captionScale})`,
                                    background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.64) 99%,rgba(0,0,0,0.65) 100%)`,
                                    padding: '0px 5px 0px 5px'
                                }}>
                                <h2
                                    style={{
                                        fontFamily: "'Open Sans', sans-serif"
                                    }}>Lorem Ipsum - Open Sans</h2>
                                <p style={{
                                    margin: '0em 0em .5em 0em',
                                    fontFamily: "'Roboto', sans-serif"
                                }}>Roboto: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..</p>
                            </div>
                            <div id='controls'
                                style={{
                                    position: 'absolute',
                                    top: '40%',
                                    bottom: '40%',
                                    left: '0px',
                                    right: '0px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <MdChevronLeft size={64}
                                    style={{
                                        opacity: leftOpacity,
                                        color: `white`
                                    }}
                                    onMouseEnter={this.handleMouseEnter.bind(this, 'left')}
                                    onMouseLeave={this.handleMouseLeave.bind(this, 'left')}
                                    onClick={this.clickHandler.bind(this, 'left')}
                                />
                                <MdChevronRight size={64}
                                    style={{
                                        opacity: rightOpacity,
                                        color: `white`
                                    }}
                                    onMouseEnter={this.handleMouseEnter.bind(this, 'right')}
                                    onMouseLeave={this.handleMouseLeave.bind(this, 'right')}
                                    onClick={this.clickHandler.bind(this, 'right')} />
                            </div>

                            <MdClose size={48}
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

                        </div>
                        <div className='nav-previous' />
                    </div>
                }
            </Motion>
            </div>
        )
    }
}

export default ImageModal;

