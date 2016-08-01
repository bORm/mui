/**
 * Преобразует месяцы в строку вида "2 года 1 месяц"
 * @param int $num Количество месяцев
 * @return string
 */
function timeAgo(num)
{
	/**
	 * Определяет правильное с точки зрения русского языка окончание месяца
	 * @param int $num
	 * @param array $postfixes
	 * @return string
	 */
	function postfix(num, postfixes)
	{
		//Делим число без остатка на 100
		num = num % 100;

		//Если больше 19, делим его без остатка ещё раз, уже на 10
		if (num > 19)
		{
			num = num % 10;
		}

		//В зависимости от того, какие числа остались, возвращаем значения
		switch (num)
		{
			case 1:
				return postfixes[0];

			case 2: case 3: case 4:
			return postfixes[1];

			default:
				return postfixes[2];
		}
	}

	//Определяем массивы с годами и месяцами
	const 
		yearsPostfixes = ['Рік', 'року', 'років'],
		monthsPostfixes = ['Місяць', 'місяця', 'місяців'];

	//Делим начальное число без остатка на 12, получаем количество месяцев
	const months = num % 12,
	//Отнимаем из начального числа количество месяцев и делим это на 12,
	//получаем количество лет
		years = (num - months) / 12;

	//Возвращаем результат postfix() зависимости от значений $years и $monthes
	if (years === 0)
	{
		return months + ' ' + postfix(months, monthsPostfixes);
	}

	if (months === 0)
	{
		return years + ' ' + postfix(years, yearsPostfixes);
	}

	return years
		+ ' ' + postfix(years, yearsPostfixes)
		+ ' ' + months
		+ ' ' + postfix(months, monthsPostfixes);
}

export default timeAgo;