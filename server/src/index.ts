import "reflect-metadata";
import { MikroORM } from '@mikro-orm/core';
import {__prod__}  from './constants'
//import { Post } from './entities/Post';
import express from 'express';
import  microConfig from './mikro-orm.config';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostsResolver } from './resolvers/posts';
import { UserResolver } from "./resolvers/user";

const main = async ()=> {

  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  //const post = await orm.em.findOne(Post,1);
  //console.log(post);
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers:[HelloResolver, PostsResolver, UserResolver],
      validate:false
    }),
    context: () => ({ em: orm.em})
  })

  app.get('/', (_, res) =>{
    res.send('hello world');
  });

  app.listen(4000, ()=>{
    console.log('server started on localhost:4000');
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({app});


  console.log('----------------------sql 2 ------------------------');

  
};

main().catch((err) =>{
    console.error(err);

});