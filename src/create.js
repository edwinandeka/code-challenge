import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Redirect } from 'react-router-dom';

import Header from './js/header';
import CreateForm from './js/form'
import Footer from './js/footer';

import request from './core/request';
import { ARTICLE_INSERT, ARTICLE_QUERY } from './core/queries';

/**
 * @author edwinandeka@gmail.com (Edwin Ramiro Ospina Ruiz)
 * @date   30 jul 2017
 * @version  1.0
 *
 * @component  <CreateFormPage />
 * @description  Representa una tarjeta de un articulo con su autor, titulo y resumen.
 */
class CreateFormPage extends Component {

    /* @constructor */
    constructor(props) {
        super(props);
      
        this.state = {
            id: props.match.params.id,
            redirectToNewPage: false
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

    /*
    * @name submit
    * @description es invocado al ser enviado el formulario correctamente
    * @param {object} values , valores de los campos del formulario 
    */
    submit(values){

        /* para poder enviar los saltos de linea por graphql */
        values.content = values.content.replace(/\n/gmi, "%n%").replace(/\r/gmi, "%r%");
        values.excerpt = values.excerpt.replace(/\n/gmi, "%n%").replace(/\r/gmi, "%r%");

        /* remplaza los valores con los del formulario */
        var args = '';
        Object.keys(values).map( (i) => {
          console.log(i);
          args += i + ': "' + values[i] + '", '
        });
        args = args.substring(0, args.length -2);

        /* se envían a guardar o actualizar */
        var query = ARTICLE_INSERT.replace('%s', args);
        request(query).then(response => {
          if (response.data.insertArticle) {
            this.setState({ id: response.data.insertArticle.id });
          }
            this.setState({ redirectToNewPage: true })
        });
        
        /* para visualizar los saltos de linea */
        values.content =  values.content.replace(/%n%/gmi, "\n").replace(/%r%/gmi, "\r");
        values.excerpt =  values.excerpt.replace(/%n%/gmi, "\n").replace(/%r%/gmi, "\r");

    }

    /**
    * @name render
    * @description nativa, se encarga de renderizar el componente
    * @return {JSX} <CreateFormPage />
    */
    render() {

        var article = this.state.article;
        var redirectToNewPage = this.state.redirectToNewPage;

        var title = (article)? 'Actualizar': 'Crear';

        if (redirectToNewPage) {
            var link = '/article/' + this.state.id;
            return(
                <div> 
                    <Redirect to={link}/>
                </div>
            );
        } else {

            return (
                <Provider store={store}>
                    <div className="App">
                        <Header />
                      
                        <article className="detail-article create-article">
                            <h2 className="subtitle">{title} un artículo</h2>

                            {/* formulario */}
                            <CreateForm onSubmit={this.submit.bind(this)} initialValues={article} initialValuesToPassThru={article} />

                        </article>
                        
                        <Footer />
                    </div>
                </Provider>
            );
        }
    }
}

export default CreateFormPage;
