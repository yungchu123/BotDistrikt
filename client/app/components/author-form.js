import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthorForm extends Component {
  @tracked authorName = '';

  @action
  async addAuthor() {
    if (this.authorName === '') {
      return;
    }

    try {
      let response = await fetch('http://localhost:3000/api/Authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.authorName,
        }),
      });

      const author = await response.json();
      console.log(author);
      this.args.updateAuthors([...this.args.data, author]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
}
