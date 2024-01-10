import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';

export default class TaskCard extends Component {
  @tracked componentName = 'task-card';
  @tracked isEdit = false;
  @tracked data;
  @tracked taskState = {}
  @tracked taskStatus

  // You can add component-specific logic here
  constructor() {
    super(...arguments);
    const { id, title, dueDate, description, status, author } = this.args.data;
    this.taskState.title = title
    this.taskState.description = description
    this.taskState.author = author
    this.taskState.dueDate = dueDate.slice(0, 10);
    this.taskState.taskId = id
    this.taskStatus = status
  }

  @action
  changeToEdit() {
    this.isEdit = true;
  }

  @action
  async updateTask() {
    this.isEdit = false;
    let response = await fetch(`http://localhost:3000/api/Tasks/${this.taskState.taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.taskState.title,
        description: this.taskState.description,
        status: this.taskStatus,
        dueDate: this.taskState.dueDate,
        authorId: this.taskState.author.id
      }),
    });
    console.log(this.taskState.status)
  }

  @action 
  async deleteTask() {
    let response = await fetch(`http://localhost:3000/api/Tasks/${this.taskState.taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    this.args.removeTask(this.taskState.taskId)
  }

  @action
  handleStatusChange(event) {
    this.taskStatus = event.target.value
  }

  @computed('taskStatus')
  get badgeColor() {
    switch (this.taskStatus) {
      case 'todo':
        return 'bg-secondary';
      case 'in-progress':
        return 'bg-warning text-dark';
      case 'completed':
        return 'bg-success';
    }
  }
}
