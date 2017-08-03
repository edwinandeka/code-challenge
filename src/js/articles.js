import React, { Component } from 'react';

import   './../css/article.css';

/**
 * @author edwinandeka@gmail.com (Edwin Ramiro Ospina Ruiz)
 * @date   26 jul 2017
 * @version  1.0
 *
 * @component  <Article />
 * @description  Representa una tarjeta de un articulo con su autor, titulo y resumen.
 */
class Article extends Component {

    /* @constructor */
    constructor(props) {
       super(props);
       this.state = {
          hover: false,
       };
    }

    /**
    * @name renderText
    * @description se encarga de renderizar lo saltos de línea de cada una de las tarjetas es invocado desde el metodo render()
    * @param {number} key , index del iterador sobre el array de articulos, id de mongoDB
    */
    renderText(item, key) {
       return (
        <span key={key}>
          {item}
          <br/>
        </span>
      )
    }


    /**
    * @name render
    * @description nativa, se encarga de renderizar el componente
    * @return {JSX} <Article />
    */
    render() {
       var details = this.props.details;
       var route = "/article/" + details.id;

       /* agregamos los saltos de línea */
        var excerpt = details.excerpt || '';
        excerpt = excerpt.split(/[\n\r]/gmi).map(this.renderText);

        return (
            <a href={route}><article className="article-post"  id={details.id}>
                <h3 className="category">{details.author}</h3>
                <h2 className="title">{details.title}</h2>
                <p className="text">{excerpt}</p>
            </article></a>
        );
    }
}

export default Article;
