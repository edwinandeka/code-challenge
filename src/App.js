import React, { Component } from 'react';
import request from './core/request';
import { ARTICLES_QUERY } from './core/queries';

import Header from './js/header';
import Footer from './js/footer';
import Article from './js/articles';

import   './css/article.css';

/**
 * @author edwinandeka@gmail.com (Edwin Ramiro Ospina Ruiz)
 * @date   26 jul 2017
 * @version  1.0
 *
 * @component  <App />
 * @description  Representa a la lista de tarjetas.
 */
class App extends Component {

    /* @constructor */
    constructor(props) {
      super(props);
      this.state = {
        articles: [],
      };
    }

    /**
    * @name renderArticle
    * @description se encarga de renderizar cada una de las tarjetas es invocado desde el metodo render()
    * @param {number} key , index del iterador sobre el array de articulos, id de mongoDB
    */
    renderArticle(key) {
        return (
            <div className="column" key={key}>
                <Article  index={key} details={this.state.articles[key]} />
            </div>
        );
    }

    /**
    * @name componentWillMount
    * @description nativo, es invocado antes del metodo render()
    * @return {void}
    */
    componentWillMount() {
        request(ARTICLES_QUERY).then(response => {
            this.setState({ articles: response.data.articles });
        });
    }

    /**
    * @name render
    * @description nativa, se encarga de renderizar el componente
    * @return {JSX} <App />
    */
    render() {
        return (
            <div className="App">
                <Header />
                    <div className="app">
                        <div className="container">
                            {Object.keys(this.state.articles).map(this.renderArticle.bind(this))}
                        </div>
                    </div>
                <Footer />
            </div>
        );
    }
}

export default App;
