import {
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
} from 'graphql';
import db from './db';

const articleType = new GraphQLObjectType({
    name: 'Article',
    description: 'This represents a Article',
    fields: () => ({
        author: {
            type: GraphQLString,
        },
        content: {
            type: GraphQLString,
        },
        excerpt: {
            type: GraphQLString,
        },
        id: {
            type: GraphQLString,
        },
        published: {
            type: GraphQLBoolean,
        },
        tags: {
            type: new GraphQLList(GraphQLString),
        },
        title: {
            type: GraphQLString,
        },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => ({


        /**
         * Consulta todos los articulos
         */
        articles: {
            type: new GraphQLList(articleType),
            resolve() {
                return db.Article.find();
            },
        },

        /**
         * Cosulta un articulo con un id
         */
        article: {
            type: articleType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(_, {
                id
            }) {
                return db.Article.findById(id);
            }
        },

        /**
         * Elimina un articulo con un id
         */
        deleteArticle: {
            type: articleType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(_, {
                id
            }) {
                return db.Article.findById(id).remove();
            }
        },


        /**
         * Crea o actualiza un articulo 
         */   
        insertArticle: {
            type: articleType,
            args: {
                id: {
                    type: GraphQLString
                },
                author: {
                    type: GraphQLString
                },
                content: {
                    type: GraphQLString
                },
                excerpt: {
                    type: GraphQLString
                },
                published: {
                    type: GraphQLString
                },
                tags: {
                    type: GraphQLString
                },
                title: {
                    type: GraphQLString
                },
            },
            resolve(_, {
                id,
                author,
                content,
                excerpt,
                published,
                tags,
                title
            }) {

                content = content.replace(/%n%/gmi, "\n").replace(/%r%/gmi, "\r");
                excerpt = excerpt.replace(/%n%/gmi, "\n").replace(/%r%/gmi, "\r");

                if (id) {
                    /* actualizar un articulo */
                    var query = {
                            _id: id
                        },
                        update = {
                            id: id,
                            author: author,
                            content: content,
                            excerpt: excerpt,
                            published: published,
                            tags: tags.split(','),
                            title: title
                        },
                        options = {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true
                        };

                    db.Article.findOneAndUpdate(query, update, options, function(error, result) {
                        if (error) return;
                        return result;
                    });


                } else {
                    /* crear un nuevo articulo */
                    return db.Article.create({
                        author: author,
                        content: content,
                        excerpt: excerpt,
                        published: published,
                        tags: tags.split(','),
                        title: title,
                    });
                }
            }
        },

    }),
});

const Schema = new GraphQLSchema({
    query: Query,
});

export default Schema;