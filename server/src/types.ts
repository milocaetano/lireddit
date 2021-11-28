import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Session } from "express-session";
declare module 'express-session' {
  interface Session {
    user_id: number,
    username: string;
    password: string;
  }
}
export type MyContext={
  em : EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>,
  req: Express.Request & { session: Session}
}

