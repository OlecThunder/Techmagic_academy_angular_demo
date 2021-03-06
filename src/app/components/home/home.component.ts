import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/taskList';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public tabTitle: string = "Tasks List";
  public tasks: ITask[] = [];

  private getTasksSubscription$: any;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.getTasksSubscription$ = this.tasksService.getTasks()
      .subscribe((tasks: ITask[]) => this.tasks = tasks);
  }

  ngOnDestroy(): void {
    this.getTasksSubscription$.unsubscribe();
  }

  public addTaskToList({title, completed}: ITask): void {
    this.tasks = [
      ...this.tasks,
      { title, completed, id: Math.random() }
    ];
  }

  public checkTask(task: ITask) {
    this.tasks = this.tasks.map((existingTask) => {
      if (existingTask.id === task.id) {
        existingTask.completed = !task.completed;
      }

      return existingTask;
    });
  }

}
