import { UserList } from './views/UserList';
import { UserEdit } from './views/UserEdit';
import { User } from './model/User';

const userEdit = new UserEdit(
  document.querySelector('#root'),
  User.buildUser({ name: 'Ingvar', age: 12 })
);
userEdit.render();

userEdit.model.on('save', () => {
  users.fetch();
});

const users = User.buildUserCollection();
users.on('change', () => {
  new UserList(document.querySelector('#store'), users).render();
});
users.fetch();
