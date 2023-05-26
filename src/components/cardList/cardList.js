import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card';
import './cardList.css';

export class CardList extends DivComponent {
	constructor(appState) {
		super();
		this.appState = appState;
		this.el.addEventListener('click', this.toggleFavorites.bind(this));
	}

	loader() {
		this.el.innerHTML = `
			<div class="cardList__loader">Загрузка...</div>
		`;
		return this.el;
	}

	toggleFavorites(event) {
		const button = event.target.closest('.card__button');
		if (!button) {
			return;
		}
		const dataKey = button.dataset.key;
		if (!dataKey) {
			return;
		}

		if (isBookInFavorites.call(this, dataKey)) {
			deleteBookInFavorites.call(this, dataKey);
		} else {
			addBookInFavorites.call(this, dataKey);
		}

		function isBookInFavorites(key) {
			const bookInFaforites = this.appState.favorites.find(
				(book) => book.key == key
			);
			return bookInFaforites !== undefined;
		}

		function addBookInFavorites(key) {
			const book = getBookFromList.call(this, key);
			this.appState.favorites.push(book);

			function getBookFromList(key) {
				return this.appState.list.find((b) => b.key == key);
			}
		}

		function deleteBookInFavorites(key) {
			this.appState.favorites = this.appState.favorites.filter(
				(book) => book.key !== key
			);
		}
	}

	render() {
		this.el.classList.add('cardList');

		if (this.appState.isLoading) {
			return this.loader();
		}

		this.el.innerHTML = `
			<h1>Найдено книг: ${this.appState.numFound}</h1>
		`;

		const cardGrid = document.createElement('div');
		cardGrid.classList.add('cardGrid');
		this.el.append(cardGrid);
		for (const card of this.appState.list) {
			cardGrid.append(new Card(this.appState, card).render());
		}
		return this.el;
	}
}
