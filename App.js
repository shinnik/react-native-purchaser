import React, { Component } from "react";
import { StyleProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontService } from "./services/FontService";
import virushackTheme from "./native-base-theme/variables/virushack";
import getTheme from "./native-base-theme/components";
import StartScreen from "./screens/StartScreen";
import CameraScreen from "./screens/CameraScreen";
import BasketScreen from "./screens/BasketScreen";
import CodeScreen from "./screens/CodeScreen";

const Stack = createStackNavigator();

export default class App extends Component {
	state = {
		isLoaded: false,
		basket: [],
	};

	componentDidMount = async () => {
		try {
			await FontService.loadFonts();
			this.setState({ isLoaded: true });
		} catch (e) {
			console.log(e);
		}
	};

	updateBasket = (item, action) => {
		if (action === "add") {
			this.setState({ basket: [...this.state.basket, item] });
		}
		if (action === "remove") {
			this.setState({
				basket: [
					...this.state.basket.filter(
						(itemToFilter) => itemToFilter.id !== item.id
					),
				],
			});
		}
	};

	render() {
		const { isLoaded } = this.state;
		return isLoaded ? (
			<NavigationContainer>
				<StyleProvider style={getTheme(virushackTheme)}>
					<Stack.Navigator initialRouteName="Start" headerMode="none">
						<Stack.Screen name="Start" component={StartScreen} />
						<Stack.Screen name="Camera">
							{(navProps) => (
								<CameraScreen updateBasket={this.updateBasket} {...navProps} />
							)}
						</Stack.Screen>
						<Stack.Screen name="Basket">
							{(navProps) => (
								<BasketScreen
									basket={this.state.basket}
									updateBasket={this.updateBasket}
									{...navProps}
								/>
							)}
						</Stack.Screen>
						<Stack.Screen name="QRCode" component={CodeScreen} />
					</Stack.Navigator>
				</StyleProvider>
			</NavigationContainer>
		) : null;
	}
}
