import React from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";

const SuccessBuyNotification = ({
	visible = false,
	price = "NaN",
	name = "неопознанный товар",
	onContinue,
}) => {
	return (
		<View>
			<Dialog.Container visible={visible}>
				<Dialog.Title>Покупка добавлена</Dialog.Title>
				<Dialog.Description>
					{`Добавлен ${name} по цене ${price}`}
				</Dialog.Description>
				<Dialog.Button onPress={onContinue} label="Продолжить" />
			</Dialog.Container>
		</View>
	);
};

export default SuccessBuyNotification;
