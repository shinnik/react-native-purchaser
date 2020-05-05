import React, { useEffect } from "react";
import {
	Text,
	Container,
	Content,
	Header,
	Footer,
	FooterTab,
	Card,
	CardItem,
	Icon,
	Button,
	Body,
	Title,
	Right,
	Left,
	H3,
} from "native-base";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// import { CommonActions } from "@react-navigation/native";

const BasketScreen = ({ basket, updateBasket, navigation }) => {
	const removeItemFromBasket = (item) => {
		updateBasket(item, "remove");
	};

	return (
		<Container>
			<Header noLeft>
				<Body>
					<View style={styles.head}>
						<Icon style={styles.basketIcon} name="basket" />
						<Title>Ваша корзина</Title>
					</View>
				</Body>
				<Right>
					<Text style={styles.text}>
						Сумма: {basket.reduce((sum, next) => sum + next.price, 0)}{" "}
					</Text>
				</Right>
			</Header>
			<Content padder>
				<Text style={styles.smallText}>
					На данный момент цены генерируются автоматически
				</Text>
				{basket.length > 0 ? (
					<ScrollView style={styles.scrollView}>
						{basket.map((item) => (
							<Card key={item.id}>
								<CardItem header>
									<View style={styles.infoAndControls}>
										<View style={styles.info}>
											<Text>{item.name}</Text>
											<Text style={styles.price}>Цена: {item.price} руб.</Text>
										</View>
										<Button
											onPress={() => removeItemFromBasket(item)}
											iconLeft
											transparent
										>
											<Icon style={styles.deleteIcon} name="trash" />
										</Button>
									</View>
								</CardItem>
								{item.restricted && (
									<CardItem footer>
										<Icon />
										<Text style={styles.restrictedText}>
											Нельзя оплатить в кассе самообслуживания
										</Text>
									</CardItem>
								)}
							</Card>
						))}
					</ScrollView>
				) : (
					<View style={styles.placeholderContainer}>
						<Text style={styles.textPlaceholder}>Корзина пуста</Text>
					</View>
				)}
				{basket.length > 0 && (
					<Button
						onPress={() => navigation.navigate("QRCode", { codeData: basket })}
						block
					>
						<Text>Завершить покупки</Text>
					</Button>
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
					<Button>
						<View style={styles.tab}>
							<Icon name="basket" />
							<Text style={styles.text}>В корзину</Text>
						</View>
					</Button>
				</FooterTab>
			</Footer>
		</Container>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		marginBottom: 20,
	},
	deleteIcon: {
		paddingRight: 10,
		color: "grey",
	},
	infoAndControls: {
		display: "flex",
		// flex: 0.3,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	head: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	placeholderContainer: {
		marginTop: 100,
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	textPlaceholder: {
		fontSize: 24,
	},
	basketIcon: {
		color: "white",
		marginRight: 10,
		marginLeft: 10,
	},
	tab: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: "white",
	},
	smallText: {
		color: "grey",
		fontSize: 12,
	},
	restrictedText: {
		color: "red",
		fontSize: 12,
	},
	price: {
		color: "grey",
	},
	info: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
	},
});

export default BasketScreen;
