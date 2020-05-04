import React from "react";
import { Container, Content, H2 } from "native-base";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const { height, width } = Dimensions.get("window");

const CodeScreen = ({ route, navigation }) => {
	return (
		<Container>
			<Content padder>
				<View style={styles.container}>
					<H2 style={styles.h2}>Просканируйте код у кассы</H2>
					<QRCode
						size={300}
						color={"black"}
						value={{ data: route.params.codeData }.toString()}
						// value="test value"
					/>
				</View>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	h2: {
		marginBottom: 30,
	},
	container: {
		height: height * 0.9,
		flex: 1,
		display: "flex",
		flexDirection: "column",
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default CodeScreen;
