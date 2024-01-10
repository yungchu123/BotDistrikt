import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthorAndTaskForm extends Component {
  @tracked authors = [];
  @tracked tasks = [];

  constructor() {
    super(...arguments);
    this.authors = this.args.data.authors;
    this.tasks = this.args.data.tasks;
  }

  @action
  updateAuthors(updatedAuthors) {
    this.authors = updatedAuthors;
  }

  @action
  addTask(newTask) {
    this.tasks = [...this.tasks, newTask]
  }

  @action
  removeTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id != taskId)
  }
}
