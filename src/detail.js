import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Header from './js/header';
import Footer from './js/footer';

import request from './core/request';
import { ARTICLE_QUERY, DELETE_QUERY } from './core/queries';

import   './css/detail.css';

/**
 * @author edwinandeka@gmail.com (Edwin Ramiro Ospina Ruiz)
 * @date   27 jul 2017
 * @version  1.0
 *
 * @component  <Detail />
 * @description  Representa una tarjeta de un articulo con su autor, titulo, resumen, contenido y tags.
 */

class Detail extends Component {

    /* @constructor */
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            redirectToNewPage: false,
            article: {},
        };
    }


    /**
    * @name componentWillMount
    * @description nativo, es invocado antes del metodo render()
    * @return {void}
    */
    componentWillMount() {
        var query = ARTICLE_QUERY.replace('%s', this.state.id);
        request(query).then(response => {
           this.setState({ article: response.data.article });
        });
    }

    /**
    * @name deleteArticle
    * @description envia el id del articulo a eliminar 
    */
    deleteArticle() {
        var query = DELETE_QUERY.replace('%s', this.state.id);
        request(query).then(response => {
            this.setState({ redirectToNewPage: true })
        });
    }

    /**
    * @name renderTag
    * @description se encarga de renderizar cada uno de los tags es invocado desde el metodo render()
    * @param {string} tag , tag relacionado al articulo
    */
    renderTag(tag) {
        return (
            <span className="tag" key={tag} >
                {tag}
            </span>
        );
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
    * @return {JSX} <Detail />
    */
    render() {

        var redirectToNewPage = this.state.redirectToNewPage;
        /* para cuando eliminas el articulo */
        if (redirectToNewPage) {
            var link = '/articles/';
            return(
                <div> 
                    <Redirect to={link}/>
                </div>
            );
        
        } else {

            var details = this.state.article;
            var tags = details.tags||[];
            var published = (details.published)? <div className="published">Publicado</div> : <div  className="published not-published">No ublicado</div>;

            link = '/update/' + this.state.id;

            /* se agregan los saltos de linea */
            var content = details.content||'';
            content = content.split(/[\n\r]/gmi).map(this.renderText);

            /* se agregan los saltos de linea */
            var excerpt = details.excerpt||'';
            excerpt = excerpt.split(/[\n\r]/gmi).map(this.renderText);


            return (
                <div className="App">
                    <Header />
                    
                    <article className="detail-article">
                        {published}
                    
                        <a className="btn btn-right" onClick={this.deleteArticle.bind(this)} >Eliminar</a>
                        <a className="btn btn-right" href={link}>Editar</a>
                    
                        <h3>{details.author}</h3>

                        <h2>{details.title}</h2>
                    
                        <p>{excerpt}</p>
                        <div className="detail-content">
                            {content}
                        </div>
                    
                        <div className="tags">
                            <h4>Tags</h4>
                            {tags.map(this.renderTag.bind(this))}
                        </div>
                    </article>
                    
                    <Footer />
                </div>
            );
        }
    }
}

export default Detail;
