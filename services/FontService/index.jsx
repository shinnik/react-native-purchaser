import * as Font from "expo-font";

export class FontService {
	static loadFonts = async () => {
		await Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("native-base/Fonts/Ionicons.ttf"),
		});
	};
}
