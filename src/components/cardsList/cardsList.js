import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card';
import './cardsList.css';

export class CardsList extends DivComponent {
	constructor(appState, parentState) {
		super();
		this.appState = appState;
		this.parentState = parentState;
		// this.el.addEventListener('click', this.toggleFavorites)
	}

	loader() {
		this.el.innerHTML = `
			<div class="cardList__loader">Загрузка...</div>
		`;
		return this.el;
	}

	// toggleFavorites(event) {
	// 	const target = event.target.closest('.card__button')
	// 	if (!target) {
	// 		return
	// 	}
	// 	console.log(target)
	// 	// if ()
	// }

	// isFavorites(book) {
	// 	return this.appState.includes(book)
	// }

	// addFavorites(book) {
	// 	this.appState.favorites.push(book)
	// }

	render() {
		this.el.classList.add('cardsList');

		console.log(this.parentState)

		if (this.parentState.isLoading) {
			return this.loader()
		} 

		this.el.innerHTML = `
			<h1>Найдено книг: ${this.parentState.numFound}</h1>
		`;
		for (const card of this.parentState.list) {
			this.el.append(new Card(this.appState, card).render())
		}
		return this.el;
	}
}
