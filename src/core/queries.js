/**
 * @author edwinandeka@gmail.com (Edwin Ramiro Ospina Ruiz)
 * @date   27 jul 2017
 * @version  1.0
 */


/**
 * obtiene la información de los articulos
 * @type {graphql} ARTICLES_QUERY
 */
export const ARTICLES_QUERY = `{
  articles {
    author
    excerpt
    id
    title
  }
}`;

/**
 * obtiene la información de un articulo con el id
 * @type {graphql} ARTICLE_QUERY
 */
export const ARTICLE_QUERY = `{
  article(id: "%s") {
    id
    author
    content
    published
    tags
    title
    excerpt
  }
}`;

/**
 * inserta la información de un articulo regresa el id
 * @type {graphql} ARTICLE_INSERT
 */
export const ARTICLE_INSERT = `{
  insertArticle( %s ) {
    id
  }
}`;

/**
 * elimina la información de un articulo regresa el id
 * @type {graphql} DELETE_QUERY
 */
export const DELETE_QUERY = `{
  deleteArticle(id: "%s") {
    id
  }
}`;