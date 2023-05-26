import { Card } from '../card/card';
import { CardList } from './cardList';
import './cardList.css';

export class CardListFavorites extends CardList {
	constructor(appState) {
		super(appState);
	}

	render() {
		this.el.classList.add('cardList');

		if (this.appState.isLoading) {
			return this.loader();
		}

		this.el.innerHTML = `
			<h1>Избранные книги</h1>
		`;

		const cardGrid = document.createElement('div');
		cardGrid.classList.add('cardGrid');
		this.el.append(cardGrid);
		for (const card of this.appState.favorites) {
			cardGrid.append(new Card(this.appState, card).render());
		}
		return this.el;
	}
}
