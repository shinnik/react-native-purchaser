import React from "react";
import Dialog from "react-native-dialog";

const SuccessBuyNotification = ({
	price = "неопределенную",
	name = "неопознанный товар",
	onContinue,
}) => {
	return (
		<View>
			<Dialog.Container>
				<Dialog.Title>Покупка добавлена</Dialog.Title>
				<Dialog.Description>
					{`Добавлен ${name} по цене ${price}`}
				</Dialog.Description>
				<Dialog.Button label="Продолжить" />
			</Dialog.Container>
		</View>
	);
};

export default SuccessBuyNotification;
