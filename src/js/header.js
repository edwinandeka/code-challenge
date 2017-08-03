import React, { Component } from 'react';

import   './../css/header.css';


/**
 * @author edwinandeka@gmail.com (Edwin Ramiro Ospina Ruiz)
 * @date   26 jul 2017
 * @version  1.0
 *
 * @component  <Header />
 * @description  Representa la cabecera de la página.
 */

class Header extends Component {

    /**
    * @name render
    * @description nativa, se encarga de renderizar el componente
    * @return {JSX} <Header />
    */
  	render() {
	    var btnCreate = (location.href === location.origin + "/create")? '' : <a href="/create" className="btn btn-create">Crear artículo</a> ;

	    return (
	      <header >
	        <a href="/" ><h1>Blog SPA</h1></a>
	        {btnCreate}
	        
	      </header>
	    );
  	}
}

export default Header;
