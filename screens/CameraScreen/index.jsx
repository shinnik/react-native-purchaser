import React, { useState, useEffect } from "react";
import _debounce from "lodash/debounce";
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
import { useFocusEffect } from "@react-navigation/native";
import SuccessBuyNotification from "../../components/SuccessBuyNotification";
import ItemModel from "../../models/ItemModel";

const { width, height } = Dimensions.get("window");
const qrSize = width * 0.7;

export default function CameraScreen({ updateBasket, navigation }) {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	const [renderScanner, setRenderScanner] = useState(false);
	const [lastScannedItem, setLastScannedItem] = useState({
		name: null,
		price: null,
	});

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	// stop scanning when another screen
	useFocusEffect(
		React.useCallback(() => {
			setRenderScanner(true);
			return () => {
				setRenderScanner(false);
			};
		}, [])
	);

	const handleBarCodeScanned = async ({ type, data }) => {
		// setScanned(true);
		const item = await ItemModel.findItemByVendor(data);
		const restricted = await ItemModel.checkItemRestrictionByVendor(data);
		if (item) {
			setLastScannedItem(item);
			updateBasket({ ...item, restricted }, "add");
		}
	};

	const onContinue = () => {
		setScanned(false);
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
				{renderScanner && (
					<BarCodeScanner
						onBarCodeScanned={
							scanned
								? undefined
								: (d) => {
										setScanned(true);
										handleBarCodeScanned(d);
								  }
						}
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
				)}

				{lastScannedItem.name && (
					<SuccessBuyNotification
						name={lastScannedItem.name}
						price={lastScannedItem.price}
						visible={scanned}
						onContinue={onContinue}
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
