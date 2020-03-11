let puzzle = (function() {

let wordsList = []; // список всех слов паззла
let words = {}; // список всех слов паззла со всеми данными

let count = 0; // количество символов во всех словах
let fieldSize = { // размер поля
	width: 0,
	height: 0
};
let cells = []; // двумерный массив ячеек с символами (на третьем шаге)

let example; // слово, которое будет служить примером

let changed = false; // изменения

let page = document.querySelector('[data-step]'); // вся страница
let setMessage = (() => {
	let message = document.getElementById('puzzle-message');
	let timer;
	let delay = 4*1000;

	return msg => {
		message.textContent = msg;
		timer = setTimeout(() => {
			message.textContent = '';
		}, delay);
	}
})();

let helpers = { // создание dom-элементов
	labelClass: 'word',
	cellClass: 'cell',
	createLabel: (word) => {
		let label = document.createElement('div');
		label.textContent = word;
		label.classList.add(helpers.labelClass);
		return label;
	},
	createRow: () => {
		let row = document.createElement('div');
		row.classList.add('row');
		return row;
	},
	createCell: () => {
		let cell = document.createElement('div');
		cell.classList.add(helpers.cellClass);
		return cell;
	},
	hideElement: element => element.classList.add('hidden'),
	showElement: element => element.classList.remove('hidden'),
	activateElement: element => element.classList.add('active'),
	deactivateElement: element => element.classList.remove('active'),
};

// первый шаг - добавление слов
let addStep = (() => {

	let selectors = { // селекторы секции
		'textarea': 'add-words-input',
		'list': 'add-words-list'
	};

	let repeatMessage = 'Повторы слов удалены';

	// поле ввода слов
	let input = (() => {
		let textarea = document.getElementById(selectors.textarea);
		let separator = /[\s,\n]+/;
		return {
			getWords: () => { // получить введенные слова
				let wordsString = textarea.value;
				return wordsString ? wordsString.split(separator) : [];
			},
			clear: () => { // очистить поле
				textarea.value = '';
			}
		}
	})();

	// список добавленных слов
	let list = (() => {
		let element = document.getElementById(selectors.list);
		let container = element.parentElement;

		let labels = {}; // все ярлыки в списке

		// удалить слово из списка добавленных
		let removeWord = word => {
			// удалить из простого списка
			let index = wordsList.indexOf(word);
			wordsList.splice(index, 1);

			// удалить из списка с данными
			delete words[word];

			// обновить список на странице
			update();

			// отметить, что произошли изменения
			// чтобы перегенерировать поле для заполнения
			changed = true;
		};

		// добавить ярлык в список
		let addLabel = (word, label) => {
			element.appendChild(label); // добавить в dom
			labels[word] = label; // добавить в объект
		};

		// удалить ярлык из списка
		let removeLabel = word => {
			let label = labels[word];
			element.removeChild(label); // удалить из dom
			delete labels[word]; // удалить из объекта
		};

		// обновить список 
		let update = () => {
			// копируем список ярлыков
			// чтобы отследить лишние
			let emptyLabels = Object.assign({}, labels);
			// обнулить количество символов в словах
			count = 0;

			wordsList.forEach(word => { // перебираем все слова из общего списка
				count += word.length;

				// если в списке на странице слова нет
				// создаем ярлык и добавляем
				if (!labels[word]) {
					let label = helpers.createLabel(word);
					label.onclick = () => removeWord(word); // при клике удаляем слово

					addLabel(word, label); // добавить ярлык в список
				} else { // если слово уже есть в dom
					delete emptyLabels[word]; // удаляем его из списка пустых ярлыков
				}
			});
			
			for (let word in emptyLabels) { // перебираем ярлыки без соответствия в общем списке
				removeLabel(word); // и удаляем их
			}

			// если нет ни одного слова
			// скрыть список вместе с кнопкой подтверждения
			if (Object.keys(labels).length) helpers.showElement(container);
			else helpers.hideElement(container);
		};

		return {
			update: update
		}
	})();

	// кнопка Добавить слова
	let addWords = () => {
		// получить слова из текстового поля
		let newWords = input.getWords();

		// убрать повторы
		let repeated = false;
		newWords.forEach(word => {
			if (!word) return;
			if (words[word]) repeated = true;
			else {
				wordsList.push(word); // добавить в простой список
				words[word] = {}; // добавить в список с данными
				changed = true; // пометить, что произошло изменение
			}
		});

		// если были повторы
		// сообщить о том, что они удалены
		if (repeated) setMessage(repeatMessage);
		
		list.update(); // вывести слова в списке
		input.clear(); // очистить поле ввода
	};

	return {
		update: () => {}, // обновление не нужно
		addWords: addWords, // кнопка Добавить слова
	};
})();

// второй шаг - установка размеров поля
let fieldStep = (() => {
	let notEnoughCells = 'Слишком мало клеток';

	// готовые варианты размеров
	let variants = [];

	// dom-элементы опций
	let options = (() => {
		let option1 = document.querySelector('[data-option="1"]');
		let option2 = document.querySelector('[data-option="2"]');
		let option3 = document.querySelector('[data-option="3"]');
		let custom = document.querySelector('[data-custom-option]');

		let optionsSelectors = {
			width: '.option__width',
			height: '.option__height',
			diff: '.option__diff'
		};

		// опция для кастомного размера
		let customWidth = custom.querySelector('[data-width-input]');
		let customHeight = custom.querySelector('[data-height-input]');
		let customDiff = custom.querySelector('.option__diff');
		let customDiffContainer = customDiff.parentElement;

		// установка обработчиков на поля кастомной опции
			let handleValue = value => {
				value = value.replace(/\D/g, '');
				value = Math.max(parseInt(value), 0);
				return value;
			}

			let updateCustomDiff = () => {
				let diff = parseInt(custom.dataset.width) * parseInt(custom.dataset.height) - count;
				if (diff >= 0) {
					customDiff.textContent = diff;
					helpers.showElement(customDiffContainer);
				} else {
					helpers.hideElement(customDiffContainer);
				}	
			};

			customWidth.parentElement.addEventListener('click', e => e.stopPropagation());
			customHeight.parentElement.addEventListener('click', e => e.stopPropagation());

			customWidth.oninput = () => {
				customWidth.value = handleValue(customWidth.value);
				custom.setAttribute('data-width', customWidth.value);
				updateCustomDiff();
			};

			customHeight.oninput = () => {
				customHeight.value = handleValue(customHeight.value);
				custom.setAttribute('data-height', customHeight.value);
				updateCustomDiff();
			};
		// установка обработчиков на поля кастомной опции

		let elements = {
			1: {
				option: option1,
				width: option1.querySelector(optionsSelectors.width),
				height: option1.querySelector(optionsSelectors.height),
				diff: option1.querySelector(optionsSelectors.diff),
			},
			2: {
				option: option2,
				width: option2.querySelector(optionsSelectors.width),
				height: option2.querySelector(optionsSelectors.height),
				diff: option2.querySelector(optionsSelectors.diff),
			},
			3: {
				option: option3,
				width: option3.querySelector(optionsSelectors.width),
				height: option3.querySelector(optionsSelectors.height),
				diff: option3.querySelector(optionsSelectors.diff),
			},
			custom: {
				option: custom,
				width: customWidth,
				height: customHeight,
				diff: customDiff,
			}
		};

		return {
			setOption: (optionIndex, variant) => { // установить готовые размеры
				if (!optionIndex || !elements[optionIndex]) return;
				let option = elements[optionIndex];
				option.width.textContent = variant.width;
				option.height.textContent = variant.height;
				option.diff.textContent = variant.diff;
				option.option.setAttribute('data-width', variant.width);
				option.option.setAttribute('data-height', variant.height);
			},
			setCustomOption: () => { // установить кастомную опцию
				let option = elements['custom'];
				option.width.value = fieldSize.width;
				option.height.value = fieldSize.height;
				option.option.setAttribute('data-width', fieldSize.width);
				option.option.setAttribute('data-height', fieldSize.height);
				updateCustomDiff();
			}
		}
	})();

	// рассчитать 3 готовых варианта
	let recount = () => {
		let vars = [];

		// 1 квадратный корень
		let side = Math.ceil(Math.sqrt(count));
		vars.push({
			width: side,
			height: side,
			diff: side * side - count
		});

		// 2,3 - квадратный корень - 1
		let aSide = side - 1;
		let bSide = Math.ceil(count / aSide);
		let diff = (aSide * bSide) - count;

		vars.push({
			width: aSide,
			height: bSide,
			diff: diff
		});
		vars.push({
			width: bSide,
			height: aSide,
			diff: diff
		});

		variants = vars;
		
		return variants;
	};

	// выбор размера (нажатие на блок-опцию)
	let setSize = (w, h) => {
		// если клеток недостаточно
		// вывести сообщение
		if (w * h < count) {
			setMessage(notEnoughCells);
		} else {
			// если установлены новые размеры 
			// обновить их
			if (fieldSize.width !== w || fieldSize.height !== h) {
				fieldSize.width = w;
				fieldSize.height = h;
				changed = true;
			}
			// перейти к шагу заполнения поля
			toStep('fill');
		}
	};

	// обновление секции
	let update = () => {
		recount(); // рассчитать готовые варианты

		// разместить их на странице
		variants.forEach((variant, index) => {
			options.setOption(index + 1, variant);
		});
		options.setCustomOption();
	};

	return {
		update: update,
		setSize: setSize // установка размера
	}
})();

// третий шаг - заполнение поля словами
let fillStep = (() => {
	let field = document.getElementById('puzzle-field'); // само поле
	let notAddedList = document.getElementById('not-added'); // список недобавленных слов
	let addedList = document.getElementById('added'); // список добавленных слов
	let confirmButton = document.getElementById('confirm-field'); // кнопка подтверждения расположения (скрыта)
	
	let added = []; // добавленные слова
	let notAdded = []; // недобавленные слова
	let currentWord; // добавляемое в данный момент слово

	// добавить размещенное слово в добавленные
	let setAddedWord = () => {
		// найти слово в недобавленных и удалить
		let index = notAdded.indexOf(currentWord);
		notAdded.splice(index, 1);

		// добавить слово в добавленные
		added.push(currentWord);

		// переместить ярлык в список добавленных
		let label = words[currentWord].label;
		addedList.appendChild(label);
		label.added = true;
	};

	// удалить слово из добавленных
	let resetAddedWord = (word) => {
		// найти слово в добавленных и удалить
		let index = added.indexOf(word);
		added.splice(index, 1);

		// очистить заполненные клетки
		let path = words[word].path;
		fieldCell.clearPath(path);

		// добавить слово в недобавленные
		notAdded.push(word);

		// переместить ярлык в список недобавленных
		let label = words[word].label;
		notAddedList.appendChild(label);
		label.added = false;
		label.classList.value = helpers.labelClass;

		setCurrentWord(-1);
	};

	// обновить ключевое слово
	let setCurrentWord = (word) => {
		// если есть текущее слово
		// убрать активность с ярлыка
		if (currentWord) {
			helpers.deactivateElement(words[currentWord].label);
		}
		// если не осталось недобавленных слов
		if (notAdded.length == 0) {
			// отобразить кнопку подтверждения
			helpers.showElement(confirmButton);
			return;
		}
		// если остались недобавленные слова
		// скрыть кнопку подтверждения
		helpers.hideElement(confirmButton);

		// если word -1, текущее слово не меняется
		if (word == -1) currentWord = currentWord;
		else currentWord = word;

		// если полученного слова нет в недобавленных, 
		// то взять первое недобавленное
		if (notAdded.indexOf(currentWord) == -1) currentWord = notAdded[0];

		helpers.activateElement(words[currentWord].label);
	};

	// методы отдельной ячейки (клетки поля)
	let fieldCell = (() => {
		let classes = {
			'select': 'select',
			'fix': 'fix',
			'delete': 'delete',
			'hover': 'hover',
			'empty': 'empty'
		};
		// получить клетку по координатам
		let getByCoords = (x, y) => cells[y][x];
		// клетка выделена
		let isSelected = cell => cell.classList.contains(classes.select);
		// клетка зафиксирована
		let isFixed = cell => cell.classList.contains(classes.fix);
		// доступна для выделения
		let isAvailable = cell => !isSelected(cell) && !isFixed(cell);
		// зафиксировать клетку с буквой
		let fix = (cell) => {
			cell.classList.add(classes.fix);
			cell.classList.remove(classes.select);
			cell.word = currentWord;
		};
		// убрать фиксацию
		let defix = (cell) => {
			cell.classList.remove(classes.fix);
			cell.word = null;
		}
		// выделить цветом (текущее выделение)
		let select = (cell, letter) => {
			cell.classList.add(classes.select);
			cell.textContent = letter;
		};
		// очистить, снять выделение
		let deselect = cell => {
			cell.classList.remove(classes.select);
			cell.classList.remove(classes.fix);
			cell.textContent = '';
		};
		let dehighlightPath = (path, className) => {
			path.forEach(coords => {
				let cell = getByCoords(coords.x, coords.y);
				cell.classList.remove(className);
			})
		};
		let highlightPath = (path, className) => {
			path.forEach(coords => {
				let cell = getByCoords(coords.x, coords.y);
				cell.classList.add(className);
			})
		};
		let clearPath = (path) => {
			path.forEach(coords => {
				let cell = getByCoords(coords.x, coords.y);
				cell.classList.value = helpers.cellClass;
				cell.textContent = '';
				cell.word = null;
			})
		};
		// создать dom-элемент
		let create = (x, y) => {
			let cell = helpers.createCell();
			
			cell.onmouseenter = () => {
				selection.hoverCell(x, y);
			};
			cell.onmouseleave = () => {
				if (isFixed(cell))
					selection.blurCell(x, y);
			};
			cell.onmousedown = () => {
				selection.clickCell(x, y);
			};
			return cell;
		};

		return {
			classes: classes,
			create: create,
			isAvailable: isAvailable,
			isFixed: isFixed,
			getByCoords: getByCoords,
			select: select,
			fix: fix,
			deselect: deselect,
			highlightPath: highlightPath,
			dehighlightPath: dehighlightPath,
			clearPath: clearPath,
		}
	})();

	// методы выделения
	let selection = (() => {
		let selected = []; // выбранные в данный момент ячейки
		let selecting = false; // ячейки находятся в процессе выделения

		let currentIndex = 0; // индекс добавляемой буквы

		// проверка, является ли выделяемая клетка предпоследней в выделении
		// если так, последняя будет удалена
		let isPreLastCell = (x, y) => {
			if (selected.length < 2) return false;
			let cell = selected[selected.length - 2];
			return cell.x == x && cell.y == y;
		};

		// получить координаты последней клетки
		// для сравнения с текущей выделенной
		let getLastCellCoords = () => {
			if (!selected.length) return null;
			return selected[selected.length - 1];
		};

		// начало выделения
		// нажатие на первую ячейку
		let start = (x, y) => { 
			let cell = fieldCell.getByCoords(x, y); // найти клетку по индексам
			// если эта клетка выделена или зафиксирована, ничего не делать
			if (!fieldCell.isAvailable(cell)) return;
			currentIndex = 0; // начать с первой буквы
			selecting = true;
			addCell(x, y); // выделить клетку
		};

		let hoverCell = (x, y) => {
			// если в данный момент выделение не идет
			// выделить весь путь слова
			if (!selecting) {
				let cell = fieldCell.getByCoords(x, y); // найти клетку по индексам
				if (cell.word) {
					fieldCell.highlightPath(words[cell.word].path, fieldCell.classes.hover);
					words[cell.word].label.classList.add(fieldCell.classes.hover);
				}
			} else { // иначе добавить клетку в выделение
				addCell(x, y);
			}
		};

		let blurCell = (x, y) => {
			if (selecting) return;
			// если клетка входит в слово, убрать выделение с него
			let cell = fieldCell.getByCoords(x, y); // найти клетку по индексам
			if (cell.word) {
				fieldCell.dehighlightPath(words[cell.word].path, fieldCell.classes.hover);
				words[cell.word].label.classList.remove(fieldCell.classes.hover);
			}
		};

		// добавить клетку в выделение
		let addCell = (x, y) => { 
			let cell = fieldCell.getByCoords(x, y); // найти клетку по индексам

			// если это предпоследняя клетка из выделения
			// снять выделение с последней
			// вернуться к предыдущему индексу
			if (isPreLastCell(x, y)) {
				removeLastCell();
				currentIndex--;
				return;
			}

			// если эта клетка выделена
			// ничего не делать
			if (!fieldCell.isAvailable(cell)) return;
		
			// добавить ее в выделение
			// если клетка первая или соседняя с предыдущей
			let lastCellCoords = getLastCellCoords();
			if (
				!lastCellCoords || 
				x == lastCellCoords.x && Math.abs(y - lastCellCoords.y) == 1
				|| y == lastCellCoords.y && Math.abs(x - lastCellCoords.x) == 1
			) {
				let letter = currentWord[currentIndex]; // взять текущую букву
				if (!letter) return;

				// сдвинуть текущий индекс
				currentIndex++;
				// выделить ячейку
				fieldCell.select(cell, letter);
				// добавить ее в выбранные
				selected.push({x: x, y: y});
			};
		};

		// удалить последнюю клетку из выделения
		let removeLastCell = () => {
			// получить последнюю клетку
			// очистить ее
			let coords = getLastCellCoords();
			let cell = fieldCell.getByCoords(coords.x, coords.y);
			fieldCell.deselect(cell);
			// удалить из массива выбранных
			selected.length = selected.length - 1;
		};

		// очистить выделение
		let clear = () => {
			// снять выделение со всех ячеек
			selected.forEach(coords => {
				let cell = fieldCell.getByCoords(coords.x, coords.y);
				fieldCell.deselect(cell);
				cell.word = null;
			});
			// очистить массив выделенных ячеек
			selected = [];
		};

		// зафиксировать выделение
		let fix = () => {
			// отметить каждую ячейку как фиксированную
			selected.forEach(coords => {
				let cell = fieldCell.getByCoords(coords.x, coords.y);
				fieldCell.fix(cell);
			});
			// очистить массив выделенных ячеек
			selected = [];
		};

		// закончить выделение 
		// отжата кнопка мышки
		let finish = () => {
			// если выделение не производилось, ничего не делать
			if (!selecting) return;
			selecting = false;
			// если слово закончено
			if (currentIndex == currentWord.length) {
				// получить маршрут слова
				words[currentWord].path = selected;
				fix(); // зафиксировать выделение
				setAddedWord(); // добавить слово в добавленные
				setCurrentWord(); // обновить текущее слово
			} else { // если слово не закончено
				clear(); // просто сбросить выделение
			}
			currentIndex = 0;
		};

		// следить за отжатиями кнопки мыши
		document.addEventListener('mouseup', () => finish());

		return {
			clickCell: start,
			hoverCell: hoverCell,
			blurCell: blurCell,
		};

	})();

	// создать пустое поле
	let createField = () => {
		// очистить поле, если уже что-то было
		field.innerHTML = '';
		// создать dom-элементы ячеек по выбранным размерам
		for (let y = 0; y < fieldSize.height; y++) {
			cells[y] = [];
			let row = helpers.createRow();
			for (let x = 0; x < fieldSize.width; x++) {
				let cell = fieldCell.create(x, y);
				cells[y].push(cell);
				row.appendChild(cell);
			}
			field.appendChild(row);
		}
	};

	// обработчик кликов по ярлыкам
	let labelClickHandler = (label, word) => {
		// если в списке добавленных
		// удалить из добавленных
		if (label.added) {
			resetAddedWord(word);
		} else { // если в списке недобавленных
			// сделать активным словом
			setCurrentWord(word);
		}
	};

	// обработка наведения на ярлык
	let labelHoverHandler = (label, word) => {
		// если в списке добавленных
		// подсветить слово на поле
		if (label.added) {
			let path = words[word].path;
			fieldCell.highlightPath(path, fieldCell.classes.delete);
		}
	};

	// обработка ухода курсора с ярлыка
	let labelBlurHandler = (label, word) => {
		// если в списке добавленных
		// убрать подсветку со слова на поле
		if (label.added) {
			let path = words[word].path;
			fieldCell.dehighlightPath(path, fieldCell.classes.delete);
		}
	};

	// заполнить список недобавленных слов
	// очистить список добавленных слов
	let setLists = () => {
		notAddedList.innerHTML = '';
		addedList.innerHTML = '';

		notAdded.forEach(word => {
			let label = helpers.createLabel(word);
			label.added = false; // отметить, что в недобавленных
			label.onclick = () => labelClickHandler(label, word);
			label.onmouseover = () => labelHoverHandler(label, word);
			label.onmouseout = () => labelBlurHandler(label, word);

			words[word].label = label;
			
			notAddedList.appendChild(label);
		})
	};

	// обновление секции
	let update = () => {
		// если не было изменений
		// ничего не обновлять
		if (!changed) return;

		// создать пустое поле по выбранным размерам
		createField();

		// заполнить список недобавленных слов
		// все слова изначально недобавленные
		notAdded = Object.keys(words);

		// обнулить список добавленных слов
		added = [];

		// заполнить списки
		setLists();

		// установить первое активное слов
		setCurrentWord(0);

		// обнулить изменения
		changed = false;
	};

	return {
		update: update
	}
})();

// четвертый шаг - выбор первого слова, завершение
let confirmStep = (() => {
	let ids = {
		'field': 'filled-field',
		'list': 'words-list'
	};

	let emptyClass = 'empty';
	let fixedClass = 'fix';
	let hoverClass = 'hover';
	let selectedClass = 'select';

	let field = document.getElementById(ids.field);
	let list = document.getElementById(ids.list);

	let fieldCells = []; // массив клеток 
	let labels = {};

	// создать поле
	// заполнить его клетками
	// пометить пустые клетки
	let createField = () => {
		field.innerHTML = '';
		for (let y = 0; y < cells.length; y++) {
			let row = helpers.createRow();
			let readyRow = cells[y];
			fieldCells[y] = [];			
			for (let x = 0; x < readyRow.length; x++) {
				let readyCell = readyRow[x];
				let cell = helpers.createCell();
				cell.textContent = readyCell.textContent;
				cell.word = readyCell.word;
				if (!readyCell.classList.contains(fixedClass)) {
					cell.classList.add(emptyClass);
				}
				fieldCells[y][x] = cell;
				row.appendChild(cell);
			}
			field.appendChild(row);
		}
	};

	// вывести все слова
	let showWords = () => {
		wordsList.forEach(word => {
			let label = helpers.createLabel(word);
			list.appendChild(label);
			label.onmouseenter = () => selectWord(word);
			label.onmouseleave = () => deselectWord(word);
			label.onclick = () => setExample(word);
			labels[word] = label;
		});
	};

	// выделить клетки слова при наведении на ярлык
	let selectWord = word => {
		let path = words[word].path;
		path.forEach(coords => {
			let cell = fieldCells[coords.y][coords.x];
			cell.classList.add(hoverClass);
		})
	};

	// убрать выделение при уходе курсора с ярлыка
	let deselectWord = word => {
		let path = words[word].path;
		path.forEach(coords => {
			let cell = fieldCells[coords.y][coords.x];
			cell.classList.remove(hoverClass);
		})
	};

	let setExample = (exampleWord) => {
		if (example) {
			let path = words[example].path;
			path.forEach(coords => {
				let cell = fieldCells[coords.y][coords.x];
				cell.classList.remove(selectedClass);
			})
		}

		example = exampleWord || wordsList[0];
		for (let word in labels) {
			if (word == example) helpers.activateElement(labels[word]);
			else helpers.deactivateElement(labels[word]);
		}
		let path = words[example].path;
		path.forEach(coords => {
			let cell = fieldCells[coords.y][coords.x];
			cell.classList.add(selectedClass);
		})
	};

	// Обновление секции
	let update = () => {
		createField();
		showWords();
		setExample();
	};

	return {
		update: update
	}
})();


let toStep = (() => { // переход к соответствующему экрану
	let stepsList = {
		'add': addStep, 
		'field': fieldStep, 
		'fill': fillStep, 
		'confirm': confirmStep
	};
	return step => {
		if (!stepsList[step]) return;
		stepsList[step].update();
		page.setAttribute('data-step', step);
	};
})();

let save = () => {
	let info = wordsList.map(word => {
			return {
				'word': word,
				'path': words[word].path,
			}
		});
	let cellsInfo = cells.map(row => {
		return row.map(cell => cell.textContent);
	});


	console.info('wordsList\n', wordsList);
	console.log('words\n', info);
	console.log('exampleWord\n', example);
	console.log('cellsArray\n', cellsInfo);

};


return {
	toStep: toStep,

	addWords: addStep.addWords,
	setSize: fieldStep.setSize,

	save: save
};
})()