import { UserShow } from './UserShow';
import { UserForm } from './UserForm';
import { View } from './View';
import { User, IUserProps } from '../model/User';

export class UserEdit extends View<User, IUserProps> {
  regionMap = (): { [key: string]: string } => ({
    userShow: '.user-show',
    userForm: '.user-form',
  });

  onRender = (): void => {
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  };

  template = () => `<div>
                        <div class="user-show"></div>
                        <div class="user-form"></div>
                    </div>`;
}
