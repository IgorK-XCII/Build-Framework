import { User, IUserProps } from './../model/User';
import { View } from './View';

export class UserShow extends View<User, IUserProps> {
  template = () => `<div>
                        <h1>User Detail</h1>
                        <div>User Name: ${this.model.get('name')}</div>
                        <div>User Age: ${this.model.get('age')}</div>
                    </div>`;
}
