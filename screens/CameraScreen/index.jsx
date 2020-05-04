import React, { useState, useEffect } from "react";
import {
	Text,
	StyleSheet,
	Dimensions,
	Image,
	View,
	Animated,
} from "react-native";
import {
	Container,
	Header,
	Content,
	Body,
	Title,
	Right,
	Footer,
	FooterTab,
	Icon,
	Button,
} from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import SuccessBuyNotification from "../../components/SuccessBuyNotification";

const { width, height } = Dimensions.get("window");
const qrSize = width * 0.7;

export default function CameraScreen({ navigation }) {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	if (hasPermission === null) {
		return <Text>Запрос на доступ к камере</Text>;
	}
	if (hasPermission === false) {
		return <Text>Доступ к камере запрещен</Text>;
	}

	return (
		<Container>
			<Header noLeft>
				<Body>
					<Title>Отсканируйте покупку</Title>
				</Body>
				<Right />
			</Header>
			<Content
				contentContainerStyle={{
					flex: 1,
					flexDirection: "column",
					justifyContent: "flex-end",
					width,
					height,
				}}
			>
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					style={[StyleSheet.absoluteFill, styles.container]}
				>
					<Text style={styles.description}>Отсканируйте покупку</Text>
					<Image
						style={styles.qr}
						source={require("../../assets/img/QR.png")}
					/>
					<Text onPress={() => navigation.pop()} style={styles.cancel}>
						Отменить
					</Text>
				</BarCodeScanner>

				{scanned && (
					<SuccessBuyNotification
						// title="Сканировать дальше"
						onContinue={() => setScanned(false)}
					/>
				)}
			</Content>
			<Footer>
				<FooterTab>
					<Button onPress={() => navigation.navigate("Camera")}>
						<View style={styles.tab}>
							<Icon name="camera" />
							<Text style={styles.text}>Сканировать</Text>
						</View>
					</Button>
					<Button onPress={() => navigation.navigate("Basket")}>
						<View style={styles.tab}>
							<Icon name="basket" />
							<Text style={styles.text}>В корзину</Text>
						</View>
					</Button>
				</FooterTab>
			</Footer>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		width: "auto",
	},
	qr: {
		marginTop: "20%",
		marginBottom: "30%",
		width: qrSize,
		height: qrSize,
	},
	description: {
		fontSize: width * 0.04,
		marginTop: "10%",
		textAlign: "center",
		width: "70%",
		color: "white",
	},
	cancel: {
		fontSize: width * 0.05,
		textAlign: "center",
		width: "70%",
		color: "white",
	},
	tab: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: "white",
	},
});
