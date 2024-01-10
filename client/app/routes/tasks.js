import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TasksRoute extends Route {
  async model() {
    try {
      // Fetch All Tasks
      const response = await fetch(
        'http://localhost:3000/api/Tasks?filter[include]=author',
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching task: ${response.status} - ${response.statusText}`,
        );
      }

      const tasks = await response.json();
      console.log(tasks);

      // Fetch All Authors
      const response2 = await fetch('http://localhost:3000/api/Authors');

      if (!response2.ok) {
        throw new Error(
          `Error fetching authors: ${response2.status} - ${response2.statusText}`,
        );
      }

      const authors = await response2.json();
      console.log(authors);

      return { tasks, authors };
    } catch (err) {
      console.log(err);
    }
  }
}
