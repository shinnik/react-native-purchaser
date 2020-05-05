import _isEmpty from "lodash/isEmpty";

// export const checkRestriction = (groups) => {
// 	return !_isEmpty(
// 		groups.find(
// 			(group) =>
// 				(group.match(/Алко/i) || group.match(/Сигар/i)) &&
// 				!group.match(/безалк/i) &&
// 				!group.match(/б\/алк/i)
// 		)
// 	);
// };

export const checkRestriction = (name) => {
	return !_isEmpty(
		name.match(/Пиво/i) ||
			name.match(/Сидр/i) ||
			name.match(/Водка/i) ||
			name.match(/Мартини/i) ||
			name.match(/Коньяк/i) ||
			name.match(/Вино$/i) ||
			name.match(/Виски/i) ||
			name.match(/Текила/i) ||
			name.match(/Бренди/i) ||
			name.match(/Шампанск/i) ||
			name.match(/медовух/i) ||
			name.match(/сигар/i)
	);
};
