import axios from "axios";
import { itemListMocks } from "../__mocks__/itemListMocks";

const BARCODE_URL = `https://barcodes.olegon.ru/api/card/name`;

function getRandomPrice(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

export default class ItemModel {
	static findItemByVendor = async (vendorId) => {
		try {
			const res = await axios.get(
				`${BARCODE_URL}/${vendorId}/B169003229947581831395051365547`
			);
			return {
				id: vendorId,
				name: res.data.names[0],
				price: getRandomPrice(30, 100),
			};
		} catch (e) {
			throw new Error(e);
		}
	};
}
