import React, { Component } from 'react';
import { PrismCode } from 'react-prism';
import { Player, ControlBar } from 'video-react';
import { Button,Container,Row,Col,ButtonGroup,Label,Input,FormText,FormGroup} from 'reactstrap';
import * as firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsxrMsRiJAppnMX5uXUT5VtzvDFCXzjxA",
  authDomain: "baseball-ui.firebaseapp.com",
  databaseURL: "https://baseball-ui.firebaseio.com",
  projectId: "baseball-ui",
  storageBucket: "baseball-ui.appspot.com",
  messagingSenderId: "813689768638",
  appId: "1:813689768638:web:3d892777346f01fd8becef"
};

firebase.initializeApp(firebaseConfig);

const sources = {
    sintelTrailer: 'https://firebasestorage.googleapis.com/v0/b/baseball-ui.appspot.com/o/korean.mp4?alt=media&token=fe3a810d-f629-4c2e-930a-20d6c525d8ac',
    bunnyTrailer: 'https://firebasestorage.googleapis.com/v0/b/baseball-ui.appspot.com/o/node.mp4?alt=media&token=5a45a671-b302-49c4-aa27-280fb3d1a089',
    bunnyMovie: 'https://firebasestorage.googleapis.com/v0/b/baseball-ui.appspot.com/o/ugly.mp4?alt=media&token=a412d3b0-90f2-4894-8f76-9bcaa6cfee8d',
    test: 'https://firebasestorage.googleapis.com/v0/b/baseball-ui.appspot.com/o/korean.mp4?alt=media&token=fe3a810d-f629-4c2e-930a-20d6c525d8ac'
  };

  export default class PlayerControl extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        source: sources.bunnyTrailer,
        source2: sources.bunnyMovie
      };
      this.play = this.play.bind(this);
      this.pause = this.pause.bind(this);
      this.load = this.load.bind(this);
      this.changeCurrentTime = this.changeCurrentTime.bind(this);
      this.seek = this.seek.bind(this);
      this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
      this.changeVolume = this.changeVolume.bind(this);
      this.setMuted = this.setMuted.bind(this);
      
    }
    componentDidMount() {
      // subscribe state change
      this.player.subscribeToStateChange(this.handleStateChange.bind(this));
      this.player2.subscribeToStateChange(this.handleStateChange.bind(this));
    }
  
    setMuted(muted) {
      return () => {
        this.player.muted = muted;
        this.player2.muted = muted;
      };
    }
  
    handleStateChange(state) {
      // copy player state to this component's state
      this.setState({
        player: state
      });
      this.setState({
        player2: state
      });
    }
  
    play() {
      this.player.play();
      this.player2.play();
    }
  
    pause() {
      this.player.pause();
      this.player2.pause();
    }
  
    load() {
      this.player.load();
      this.player2.load();
    }
  
    changeCurrentTime(seconds) {
      return () => {
        const { player } = this.player.getState();
        this.player.seek(player.currentTime + seconds);
        this.player2.seek(player.currentTime + seconds);
      };
    }
  
    seek(seconds) {
      return () => {
        this.player.seek(seconds);
        this.player2.seek(seconds);
      };
    }
  
    changePlaybackRateRate(steps) {
      return () => {
        const { player } = this.player.getState();
        this.player.playbackRate = steps;
        this.player2.playbackRate = steps;;
      };
    }
  
    changeVolume(steps) {
      return () => {
        const { player } = this.player.getState();
        this.player.volume = player.volume + steps;
        this.player2.volume = player.volume + steps;
      };
    }
  
    changeSource(name) {
      return () => {
        this.setState({
          source: sources[name]
        });
        this.player.load();
      };
    }
    render() {
      return (
        
        <Container className="border">
          <div className="text-center" style={{ padding: '.6rem' }}><h1 className="text-nowrap bd-highlight">Baseball-UI</h1></div>
          <Row xs="2">
            <Col  className="border">
              <Player
                ref={player => {
                  this.player = player;
                }}
                fluid={false}
                width='100'
                height={400}
                style={{paddingTop: '50',}}
              >
                <source src={this.state.source2} />
                <ControlBar autoHide={false} />
              </Player>
            </Col>
            <Col className="border">
              <Player
                ref={player => {
                  this.player2 = player;
                }}
                fluid={false}
                width='100'
                height={400}
              >
                <source src={this.state.source} />
                <ControlBar autoHide={true} />
              </Player>
            </Col>
          </Row>
          <div className="d-flex justify-content-center" style={{ padding: '.6rem' }}>
            <ButtonGroup>
              <Button outline onClick={this.changeCurrentTime(-5)}>&lt;&lt;</Button>
              <Button outline onClick={this.play}>Play</Button>
              <Button outline onClick={this.pause}>Pause</Button>
              <Button outline onClick={this.load}>Reset</Button>
              <Button outline onClick={this.changeCurrentTime(5)}>&gt;&gt;</Button>
            </ButtonGroup>
          </div>
          <div className="d-flex justify-content-center" style={{ padding: '.6rem' }}>
            <ButtonGroup className="clearfix">
              <Button outline onClick={this.changePlaybackRateRate(2)} className='btn'>2.00</Button>
              <Button outline onClick={this.changePlaybackRateRate(1.75)} className='btn'>1.75</Button>
              <Button outline onClick={this.changePlaybackRateRate(1.25)} className='btn'>1.25</Button>
              <Button outline onClick={this.changePlaybackRateRate(1)} className='btn'>1.00</Button>
              <Button outline onClick={this.changePlaybackRateRate(0.75)} className='btn'>0.75</Button>
              <Button outline onClick={this.changePlaybackRateRate(0.5)} className='btn'>0.50</Button>
              <Button outline onClick={this.changePlaybackRateRate(0.25)} className='btn'>0.25</Button>
            </ButtonGroup>
          </div>
        
          <Label inline for="exampleFile">File:</Label>
          <Input inline type="file" name="file" id="exampleFile" />
          <FormText color="muted">
          </FormText>
        </Container>
      );
    }
  }