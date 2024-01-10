import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';

export default class TaskForm extends Component {
  @tracked componentName = 'task-card';
  @tracked title = '';
  @tracked authorId = '';
  @tracked dueDate = '';
  @tracked description = '';
  @tracked errorMsg = '';

  @action
  async createNewTask(e) {
    e.preventDefault();
    console.log('a');
    console.log(this.title);
    console.log(this.authorId);
    console.log(this.dueDate);
    console.log(this.description);

    if (!this.title) {
      this.errorMsg = 'Title cannot be empty';
      return;
    }
    if (!this.authorId) {
      this.errorMsg = 'Author cannot be empty';
      return;
    }
    if (!this.dueDate) {
        this.errorMsg = 'Due Date cannot be empty';
        return;
    }

    this.errorMsg = '';

    try {
      let response = await fetch('http://localhost:3000/api/Tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.title,
          description: this.description,
          dueDate: this.dueDate,
          authorId: this.authorId,
        }),
      });

      const data = await response.json();
      this.args.addTask(data)
      console.log(data)
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  @action
  handleAuthorChange(event) {
    this.authorId = event.target.value;
  }
}
