import React from "react";
import { StyleSheet, View } from "react-native";
import {
	Container,
	Header,
	Content,
	Body,
	Text,
	Button,
	Title,
	Right,
} from "native-base";

const StartScreen = ({ navigation }) => {
	const onStart = () => {
		navigation.navigate("Camera");
	};

	return (
		<Container>
			<Header noLeft>
				<Body>
					<Title>Scan and Pay</Title>
				</Body>
				<Right />
			</Header>
			<Content contentContainerStyle={styles.content} padder>
				<View>
					<Button onPress={onStart} block>
						<Text>Начать</Text>
					</Button>
				</View>
			</Content>
		</Container>
	);
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		padding: 80,
		textAlign: "center",
		justifyContent: "center",
	},
	text: {
		// textAlign: "center",
	},
});

export default StartScreen;
