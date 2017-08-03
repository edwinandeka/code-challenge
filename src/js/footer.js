import React, { Component } from 'react';

import   './../css/footer.css';

/**
 * @author edwinandeka@gmail.com (Edwin Ramiro Ospina Ruiz)
 * @date   26 jul 2017
 * @version  1.0
 *
 * @component  <Footer />
 * @description  Representa pie de página, muestra información acerca del desarrollador.
 */
class Footer extends Component {


    /**
    * @name render
    * @description nativa, se encarga de renderizar el componente
    * @return {JSX} <Footer />
    */
  	render() {

    	return (
      		<footer className="footer-container">
				<div className="container-center">	

					{/*información de contacto*/}
			    	<ul className="column">
			    		<li className="subtitle">Contacto</li>	
			    		<li>KR 10 # 1 - 175 oeste</li>	
			    		<li>Cali, Colombia</li>	
			    		<li className="separator"></li>	
			    		<li>+(57) 318 795 0628</li>	
			    		<li>+(57) 315 258 7620</li>	
			    		<li>edwinandeka@gmail.com</li>	
			    	</ul>	

					{/* links de interés */}
			    	<ul className="column">
			    		<li className="subtitle">Enlaces de interés</li>	
			    		<li><a target="_blank" href="https://play.google.com/store/apps/developer?id=EDWIN%20RAMIRO%20OSPINA%20RUIZ&hl=es">Google play</a></li>	
			    		<li><a target="_blank" href="https://www.linkedin.com/in/edwin-ramiro-ospina-ruiz-b00b70b6/">Linkedin</a></li>	
			    		<li><a target="_blank" href="https://github.com/edwinandeka">Github</a></li>	
			    		<li><a target="_blank" href="http://dowesoft.com/profile/">Perfil</a></li>	
			    	</ul>	

				</div>
			</footer>
		);
    }
}

export default Footer;
