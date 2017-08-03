import React from 'react';
import { Field, reduxForm } from 'redux-form';

import   './../css/form.css';


/**
 * @author edwinandeka@gmail.com (Edwin Ramiro Ospina Ruiz)
 * @date   30 jul 2017
 * @version  1.0
 *
 * @component  <SimpleForm />
 * @description  formulario usando redux, para crear y actualizar un articulo.
 */

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>

        {/* Publicado */}
        <div>
            <Field name="published" component="input" type="checkbox" />
            <label>Publicado</label>
        </div>

         {/* id */}
        <Field name="id" component="input" type="hidden" />

        {/* Autor */}
        <label>Autor</label>
        <Field name="author" component="input" type="text" required="true" placeholder="Ingrese el nombre completo del autor"  />

        {/* Título */}
        <label>Título</label>
        <Field name="title" component="input" type="text" required="true" placeholder="Elija el título que desee para su articulo"  />

        {/* Resumen */}
        <label>Resumen</label>
        <Field name="excerpt" component="textarea" type="text" required="true" rows="6" placeholder="Escriba un breve resumen como introdución para sus lectores"  />

        {/* Contenido */}
        <label>Contenido</label>
        <Field name="content" component="textarea" type="text" required="true" rows="24" placeholder="Redacte su articulo"  />

        {/* Tags */}
        <label>Tags <small>(Ingrese los tags separados por coma.)</small></label>
        <Field name="tags" component="input" type="text" required="true" placeholder="Asocia palabras clave para que los lectores puedan encontrar su articulo"  />

        <button className="btn-save" type="submit" disabled={pristine || submitting}>Guardar</button>
        <button className="btn-clean"  type="button" disabled={pristine || submitting} onClick={reset}>
          Limpiar
        </button>

    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(SimpleForm);

