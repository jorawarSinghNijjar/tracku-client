import React,{useContext} from "react";
import { StyleSheet, View } from "react-native";
import {NavigationEvents} from 'react-navigation'
import NavLink from "../components/NavLink";
import AuthForm from './../components/AuthForm';
import { Context as AuthContext } from "../context/AuthContext";
import Spacer from './../components/Spacer';

const SignInScreen = () => {
  const { state, signIn,clearErrorMessage } = useContext(AuthContext);

  console.log(state);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign In To Your Account"
        errorMessage={state.errorMessage}
        submitButtonTitle="Sign In"
        onSubmit={signIn}
      />
      <Spacer />
      <NavLink text="Don't have an account? Sign up" routeName="SignUp" />
    </View>
  );
};

SignInScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
});

export default SignInScreen;
