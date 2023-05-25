import { DivComponent } from '../../common/div-component';
import './cardsList.css';

export class CardsList extends DivComponent {
	constructor(state) {
		super();
		this.state = state;
	}

	loader() {
		this.el.innerHTML = `
			<div class="cardList__loader">Загрузка...</div>
		`;
		return this.el;
	}

	render() {
		this.el.classList.add('cardList');

		if (this.state.isLoading) {
			return this.loader()
		} 

		this.el.innerHTML = `
			<h1>Найдено книг: ${this.state.list.length}</h1>
		`;
		
		return this.el;
	}
}
