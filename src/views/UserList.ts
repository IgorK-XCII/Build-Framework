import { UserShow } from './UserShow';
import { User, IUserProps } from './../model/User';
import { CollectionView } from './CollectionView';

export class UserList extends CollectionView<User, IUserProps> {
  renderItem = (model: User, itemParent: Element): void => {
    new UserShow(itemParent, model).render();
  };
}
