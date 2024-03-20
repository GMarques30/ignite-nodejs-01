import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'
import { MarkTaskAsCompleteOrNotUseCase } from './mark-task-as-complete-or-not'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { makeTask } from 'test/factories/make-task'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

describe('Mark Task As Complete Or Not Use Case', () => {
  let inMemoryTasksRepository: InMemoryTasksRepository
  let sut: MarkTaskAsCompleteOrNotUseCase

  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new MarkTaskAsCompleteOrNotUseCase(inMemoryTasksRepository)
  })

  it('should be able to mark a task as completed', async () => {
    const task = makeTask({}, new UniqueEntityID('1'))

    inMemoryTasksRepository.create(task)

    expect(inMemoryTasksRepository.items).toHaveLength(1)

    await sut.execute({
      taskId: '1',
    })

    expect(inMemoryTasksRepository.items[0]).toEqual(
      expect.objectContaining({
        completedAt: expect.any(Date),
      }),
    )
  })

  it('should not be able to mark a task not found as completed', async () => {
    const task = makeTask({}, new UniqueEntityID('1'))

    inMemoryTasksRepository.create(task)

    expect(inMemoryTasksRepository.items).toHaveLength(1)

    const result = await sut.execute({
      taskId: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to mark a completed task as not completed', async () => {
    const task = makeTask(
      {
        completedAt: new Date(),
      },
      new UniqueEntityID('1'),
    )

    inMemoryTasksRepository.create(task)

    expect(inMemoryTasksRepository.items).toHaveLength(1)

    await sut.execute({
      taskId: '1',
    })

    expect(inMemoryTasksRepository.items[0]).toEqual(
      expect.objectContaining({
        completedAt: null,
      }),
    )
  })
})
