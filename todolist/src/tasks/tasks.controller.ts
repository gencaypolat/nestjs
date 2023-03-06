import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { timeStamp } from 'console';
import { SrvRecord } from 'dns';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')    // '/tasks' route u için
export class TasksController {
    constructor(private tasksService: TasksService) { }    //property miz tasksService. ve bu property TasksService type ında. aslında burda TasksService i inject ettik.

    @Get()          //'tasks' e get request geldiğinde bu method u çalıştır demek.
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {          //bu method un Task array ini döndürceğini belirtmiş oluyoruz. Buna type safety denir.

        //if we have any filters defined, call taskService.getTasksWithFilters
        //otherwise, just get all tasks
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();     //this kullfandık,çünkü tasksService bu class ın property si.
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);

    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')                   //id yi kullanarak task in status ünü değiştiriyoruz.
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }

}
