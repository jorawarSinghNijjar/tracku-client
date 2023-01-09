import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Spacer from "./Spacer";

const AuthForm = ({
  headerText,
  errorMessage,
  submitButtonTitle,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button
        title={submitButtonTitle}
        onPress={() => onSubmit({email,password})}
      />
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
});

export default AuthForm;
