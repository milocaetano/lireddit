import { User } from '../entities/User';
import { MyContext } from 'src/types';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import argon2 from 'argon2';
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<User | null> {
    if (req.session.username) {
      const user = await em.findOne(User, { username: req.session.username });
      return user;
    }

    return null;
  }

  @Query(() => [User], { nullable: true })
  async allusers(@Ctx() { em }: MyContext): Promise<User[] | null> {
    const users = await em.find(User, {});
    return users;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const errors: FieldError[] = new Array<FieldError>();

    if (options.username.length <= 3) {
      errors.push(
        Object.assign(new FieldError(), {
          field: 'username',
          message: 'username length must must be greather than 3',
        })
      );
    }

    if (options.password.length <= 2) {
      errors.push(
        Object.assign(new FieldError(), {
          field: 'password',
          message: 'password length must be greather than 2',
        })
      );
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    try {
      await em.persistAndFlush(user);
      req.session.username = user.username;
    } catch (err) {
      //|| err.detail.includes("already exists")) {
      // duplicate username error

      console.log(err);
      if (err.code === '23505') {
        errors.push(
          Object.assign(new FieldError(), {
            field: 'username',
            message: 'Username already taken2',
          })
        );
      } else {
        errors.push(
          Object.assign(new FieldError(), {
            field: 'username',
            message: 'something wrong',
          })
        );
      }
    }

    if (errors.length == 0) return { user };

    return {
      errors: errors,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: "that username doesn't exists",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }

    try {
      req.session.username = user.username;
    } catch (e) {
      console.error(e);
    }
    return {
      user,
    };
  }
}