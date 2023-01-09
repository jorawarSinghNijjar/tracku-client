import React from "react";
import { Text, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue",
    textAlign: "center",
  },
});

export default withNavigation(NavLink);
