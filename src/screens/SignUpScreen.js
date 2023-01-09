import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const SignUpScreen = ({ navigation }) => {
  const { state, signUp, clearErrorMessage, tryLocalSignIn } =
    useContext(AuthContext);

  // console.log(state)

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign Up for Tracku"
        errorMessage={state.errorMessage}
        submitButtonTitle="Sign Up"
        onSubmit={signUp}
      />
      <Spacer />
      <NavLink text="Already have an account? Sign in" routeName="SignIn" />
    </View>
  );
};

SignUpScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    // borderColor: "red",
    // borderWidth: 10,
    flex: 1,
    // justifyContent: "center",
    marginTop: 100,
  },
});

export default SignUpScreen;
