import axios from "axios";
import { itemListMocks } from "../__mocks__/itemListMocks";
import { checkRestriction } from "../../helpers/checkRestriction";

const BARCODE_URL_NAME = `https://barcodes.olegon.ru/api/card/name`;
const BARCODE_URL_CLASS = `https://barcodes.olegon.ru/api/card/class`;

function getRandomPrice(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

export default class ItemModel {
	static findItemByVendor = async (vendorId) => {
		try {
			const res = await axios.get(
				`${BARCODE_URL_NAME}/${vendorId}/B169003229947581831395051365547`
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

	static checkItemRestrictionByVendor = async (vendorId) => {
		try {
			const res = await axios.get(
				`${BARCODE_URL_NAME}/${vendorId}/B169003229947581831395051365547`
			);
			const isRestricted = checkRestriction(res.data.names[0]);
			return isRestricted;
		} catch (e) {
			throw new Error(e);
		}
	};
}
