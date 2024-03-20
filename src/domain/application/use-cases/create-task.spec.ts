import { InMemoryTasksRepository } from './../../../../test/repositories/in-memory-tasks-repository'
import { CreateTaskUseCase } from './create-task'

describe('Create Task Use Case', () => {
  let inMemoryTasksRepository: InMemoryTasksRepository
  let sut: CreateTaskUseCase

  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(inMemoryTasksRepository)
  })

  it('should be able to create a task', async () => {
    const result = await sut.execute({
      title: 'New task',
      description: 'New description',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryTasksRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'New task',
          description: 'New description',
        }),
      ]),
    )
  })
})
