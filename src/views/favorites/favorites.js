import { MainView } from '../main/main.js';
import { CardListFavorites } from '../../components/cardList/cardListFavorites.js';
import { Header } from '../../components/header/header.js';

export class FavoritesView extends MainView {
	constructor(appState) {
		super(appState);
		this.setTitle('Избранное');
	}

	render() {
		this.app.innerHTML = '';
		this.app.append(new Header(this.appState).render());
		this.app.append(new CardListFavorites(this.appState).render());
	}
}
