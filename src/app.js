import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: null
    };
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAfKPaQxOFeR6UG8vehOstbNCAhouzvv8I',
      authDomain: 'authentication-60b61.firebaseapp.com',
      databaseURL: 'https://authentication-60b61.firebaseio.com',
      projectId: 'authentication-60b61',
      storageBucket: 'authentication-60b61.appspot.com',
      messagingSenderId: '322627329047'
    });

    //knows if user signed in or out
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />; //wrap in View tag and style?
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
