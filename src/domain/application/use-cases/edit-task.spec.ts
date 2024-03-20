import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'
import { EditTaskUseCase } from './edit-task'
import { makeTask } from 'test/factories/make-task'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { RequiredFieldsError } from 'src/core/errors/errors/required-fields-error'

describe('Edit Task Use Case', () => {
  let inMemoryTasksRepository: InMemoryTasksRepository
  let sut: EditTaskUseCase

  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new EditTaskUseCase(inMemoryTasksRepository)
  })

  it('should be able to edit a task by giving it a new title and description', async () => {
    const task = makeTask({
      title: 'Old title',
      description: 'Old description',
    })

    inMemoryTasksRepository.create(task)

    await sut.execute({
      taskId: task.id.toString(),
      title: 'New title',
      description: 'New description',
    })

    expect(inMemoryTasksRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'New title',
          description: 'New description',
        }),
      ]),
    )
  })

  it('should be able to edit a task by just giving it a new title', async () => {
    const task = makeTask({
      title: 'Old title',
      description: 'Old description',
    })

    inMemoryTasksRepository.create(task)

    await sut.execute({
      taskId: task.id.toString(),
      title: 'New title',
    })

    expect(inMemoryTasksRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'New title',
          description: 'Old description',
        }),
      ]),
    )
  })

  it('should be able to edit a task by just giving it a new description', async () => {
    const task = makeTask({
      title: 'Old title',
      description: 'Old description',
    })

    inMemoryTasksRepository.create(task)

    await sut.execute({
      taskId: task.id.toString(),
      description: 'New description',
    })

    expect(inMemoryTasksRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Old title',
          description: 'New description',
        }),
      ]),
    )
  })

  it('should not be able to edit a task that does not exist', async () => {
    const task = makeTask({
      title: 'Old title',
      description: 'Old description',
    })

    inMemoryTasksRepository.create(task)

    const result = await sut.execute({
      taskId: 'id does not exist',
      title: 'New title',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit a task if you dont send a title or description', async () => {
    const task = makeTask({
      title: 'Old title',
      description: 'Old description',
    })

    inMemoryTasksRepository.create(task)

    const result = await sut.execute({
      taskId: task.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(RequiredFieldsError)
  })
})
