import { Collection } from './Collection';
import { Sync } from './Sync';
import { Eventing } from './Eventing';
import { Attributes } from './Attributes';
import { Model } from './Model';

export interface IUserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<IUserProps> {
  static buildUser(attrs: IUserProps): User {
    return new User(
      new Attributes<IUserProps>(attrs),
      new Eventing(),
      new Sync<IUserProps>(rootUrl)
    );
  }
  static buildUserCollection(): Collection<User, IUserProps> {
    return new Collection<User, IUserProps>(rootUrl, (json: IUserProps) =>
      User.buildUser(json)
    );
  }
}
