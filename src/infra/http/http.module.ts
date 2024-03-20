import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateTaskController } from './controllers/create-task.controller'
import { DeleteTaskController } from './controllers/delete-task.controller'
import { EditTaskController } from './controllers/edit-task.controller'
import { FetchTasksController } from './controllers/fetch-tasks.controller'
import { MarkTaskAsCompleteOrNotController } from './controllers/mark-task-as-complete-or-not.controller'
import { ImportCsvTaskController } from './controllers/import-csv-task.controller'
import { CreateTaskUseCase } from '../../domain/application/use-cases/create-task'
import { DeleteTaskUseCase } from '../../domain/application/use-cases/delete-task'
import { EditTaskUseCase } from '../../domain/application/use-cases/edit-task'
import { FetchTasksUseCase } from '../../domain/application/use-cases/fetch-tasks'
import { MarkTaskAsCompleteOrNotUseCase } from '../../domain/application/use-cases/mark-task-as-complete-or-not'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateTaskController,
    DeleteTaskController,
    EditTaskController,
    FetchTasksController,
    MarkTaskAsCompleteOrNotController,
    ImportCsvTaskController,
  ],
  providers: [
    CreateTaskUseCase,
    DeleteTaskUseCase,
    EditTaskUseCase,
    FetchTasksUseCase,
    MarkTaskAsCompleteOrNotUseCase,
  ],
})
export class HttpModule {}
