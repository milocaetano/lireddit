import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver{
  @Query( ()=> String)
  hellow(){
    return 'Hello World'
  }
}