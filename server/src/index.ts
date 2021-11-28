import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import express from 'express';
import microConfig from './mikro-orm.config';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostsResolver } from './resolvers/posts';
import { UserResolver } from './resolvers/user';
import * as redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import './types';
const main = async () => {
  const orm = await MikroORM.init(microConfig);
  const client = redis.createClient();
  const RedisStore = connectRedis(session);

  client.on('error', function (err) {
    console.log('redis is not running');
    console.log(err);
  });
  client.on('connect', function () {
    console.log('redis is running');
  });

  //await orm.getMigrator().up();
  //const post = await orm.em.findOne(Post,1);
  //console.log(post);
  const app = express();
  app.use(
    session({
      store: new RedisStore({ client: client, disableTouch: true }),
      secret: 'secret$%^134',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: 1000 * 60 * 10, // session max age in miliseconds
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostsResolver, UserResolver],
      validate: false,
    }),
    context: ({ req }) => ({ em: orm.em, req }),
  });

  app.get('/', (_, res) => {
    res.send('hello world');
  });

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });

  app.get('/fakelogin', (req, res) => {
    const session = req.session;
    session.username = 'camilo.caetano';

    res.send('camilo.caetano is login');
  });

  app.get('/showfakelogin', (req, res) => {
    const session = req.session;

    if (session.username) {
      res.send(session.username);
    } else {
      res.send('not logged');
    }
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  console.log('----------------------sql 2 ------------------------');
};

main().catch(err => {
  console.error(err);
});
