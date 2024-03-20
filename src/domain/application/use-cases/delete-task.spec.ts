import { InMemoryTasksRepository } from './../../../../test/repositories/in-memory-tasks-repository'
import { makeTask } from '../../../../test/factories/make-task'
import { DeleteTaskUseCase } from './delete-task'
import { UniqueEntityID } from '../../../core/entities/unique-entity-id'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

describe('Delete Task Use Case', () => {
  let inMemoryTasksRepository: InMemoryTasksRepository
  let sut: DeleteTaskUseCase

  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new DeleteTaskUseCase(inMemoryTasksRepository)
  })

  it('should be able to delete a task', async () => {
    const task = makeTask()

    inMemoryTasksRepository.create(task)

    await sut.execute({ taskId: task.id.toString() })

    expect(inMemoryTasksRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a task not available', async () => {
    const task = makeTask({}, new UniqueEntityID('1'))

    inMemoryTasksRepository.create(task)

    const result = await sut.execute({ taskId: '2' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
