import { DivComponent } from '../../common/div-component';
import './search.css';

export class Search extends DivComponent {
	constructor(appState) {
		super();
		this.appState = appState;
	}

	search() {
		const value = this.el.querySelector('input').value;
		this.appState.searchQuery = value;
	}

	render() {
		this.el.classList.add('search');
		this.el.innerHTML = `
			<div class="search__wrapper">
				<input 
					type="text" 
					placeholder="Найти книгу или автора..."
					class="search__input"
					value="${this.appState.searchQuery ? this.appState.searchQuery : ''}"
				/>
				<img src="/static/search.svg" alt="Поиск"/>
				</div>
				<button class="search__button" aria-label="Искать">
					<img src="/static/search-white.svg" alt="Поиск"/>
				</button>
		`;

		this.el
			.querySelector('.search__button')
			.addEventListener('click', this.search.bind(this));

		this.el.querySelector('.search__input').addEventListener('keydown', (e) => {
			if (e.code === 'Enter') {
				this.search();
			}
		});
		return this.el;
	}
}
