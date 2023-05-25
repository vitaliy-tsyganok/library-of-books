import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import { CardsList } from '../../components/cardsList/cardsList.js';

export class MainView extends AbstractView {
	state = {
		list: [],
		numFound: 0,
		isLoading: false,
		searchQuery: undefined,
		offset: 0,
	};

	constructor(appState) {
		super();
		this.appState = appState;
		this.appState = onChange(this.appState, this.appStateHook.bind(this));
		this.state = onChange(this.state, this.stateHook.bind(this));
		this.setTitle('Поиск книг');
	}

	appStateHook(path) {
		if (path === 'favorites') {
			console.log(path);
		}
	}

	async stateHook(path) {
		if (path === 'searchQuery') {
			this.state.isLoading = true;
			const data = await this.loadList(
				this.state.searchQuery,
				this.state.offset
			);
			console.log(data);
			this.state.isLoading = false;
			this.state.numFound = data.numFound;
			this.state.list = data.docs;
		}

		if (path === 'isLoading' || path === 'list' || path === 'numFound') {
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
		this.app.append(new Search(this.state).render());
		this.app.append(new CardsList(this.appState, this.state).render());
	}

}
