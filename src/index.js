import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import CreateFormPage from './create';
import Detail from './detail';
import App from './App';

/**
 * @author edwinandeka@gmail.com (Edwin Ramiro Ospina Ruiz)
 * @date   30 jul 2017
 * @version  1.0
 *
 * @description  se encarga del enrutamiento de las páginas a tráves de los path
 */
ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route exact path="/" render={() => (
                <Redirect to="/articles"/>)} />
            
            <Route path="/articles" component={App} />
            <Route path="/article/:id" component={Detail}/>
            <Route path="/create" component={CreateFormPage} />
            <Route path="/update/:id" component={CreateFormPage} />
        </div>
    </BrowserRouter>
), document.getElementById('root'))
