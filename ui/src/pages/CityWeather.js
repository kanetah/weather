import React, {Component} from 'react';
import TweenOne from 'rc-tween-one';

export default class CityWeather extends Component {

    styleObj = {
        position: "fixed",
        left: 0,
        top: 50,
        zIndex: -2,
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        opacity: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    constructor(props) {
        super(props);
        this.animation = {
            duration: 400,
            opacity: 1,
            top: 0,
        };
        this.style = this.styleObj;
        this.state = {
            moment: null,
            paused: true,
            reverse: false,
        };
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextProps.city !== this.props.city) {
            this.styleObj.zIndex = nextProps.city ? 2 : -2;
            this.style = this.styleObj;
            if (nextProps.city) {
                this.setState({ // play
                    paused: false,
                    reverse: false,
                    moment: null,
                });
            }
        }
        return true;
    };

    drillUp = () => {
        this.setState({ // reverse
            paused: false,
            reverse: true,
            moment: null,
        });
        setTimeout(() => {
            this.props.drillUp();
        }, this.animation.duration);
    };

    render() {
        return (
            <TweenOne
                style={this.style}
                animation={this.animation}
                paused={this.state.paused}
                reverse={this.state.reverse}
                moment={this.state.moment}
                onClick={this.drillUp}
            >
                {`${this.props.city}`}
            </TweenOne>
        )
    }
}