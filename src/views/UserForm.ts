import { User, IUserProps } from './../model/User';
import { View } from './View';

export class UserForm extends View<User, IUserProps> {
  eventMap = (): { [key: string]: () => void } => ({
    'click:.set-age': this.onSetAgeClick,
    'click:.set-name': this.onSetNameClick,
    'click:.save-model': this.onSaveModelClick,
  });

  onSaveModelClick = (): void => {
    this.model.save();
  };

  onSetNameClick = (): void => {
    this.model.set({ name: this.parent.querySelector('input').value });
  };

  onSetAgeClick = (): void => {
    this.model.set({ age: Math.round(Math.random() * 100) });
  };

  template = (): string => `<div>
                              <input placeholder="${this.model.get('name')}"/>
                              <button class="set-name">Change name</button>
                              <button class="set-age">Set random age</button>
                              <button class="save-model">Save User</button>
                            </div>`;
}
