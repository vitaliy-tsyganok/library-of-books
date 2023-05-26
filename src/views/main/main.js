import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import { CardList } from '../../components/cardList/cardList.js';

export class MainView extends AbstractView {
	constructor(appState) {
		super();
		this.appState = appState;
		this.appState = onChange(this.appState, this.appStateHook.bind(this));
		this.setTitle('Поиск книг');
	}

	destroy() {
		onChange.unsubscribe(this.appState);
	}

	async appStateHook(path) {
		if (path === 'searchQuery') {
			this.appState.isLoading = true;
			const data = await this.loadList(
				this.appState.searchQuery,
				this.appState.offset
			);
			this.appState.isLoading = false;
			this.appState.numFound = data.numFound;
			this.appState.list = data.docs;
		}

		const trigers = ['isLoading', 'list', 'numFound', 'favorites'];
		if (trigers.includes(path)) {
			this.render();
		}
	}

	async loadList(q, offset) {
		const res = await fetch(
			`https://openlibrary.org/search.json?q=${q}&${offset}`
		);
		return res.json();
	}

	render() {
		this.app.innerHTML = '';
		this.app.append(new Header(this.appState).render());
		this.app.append(new Search(this.appState).render());
		this.app.append(new CardList(this.appState).render());
	}
}
