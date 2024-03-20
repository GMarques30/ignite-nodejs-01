import { InMemoryTasksRepository } from 'test/repositories/in-memory-tasks-repository'
import { FetchTasksUseCase } from './fetch-tasks'
import { makeTask } from 'test/factories/make-task'

describe('Fetch Tasks Use Case', () => {
  let inMemoryTasksRepository: InMemoryTasksRepository
  let sut: FetchTasksUseCase

  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository()
    sut = new FetchTasksUseCase(inMemoryTasksRepository)
  })

  it('should be able to return all the tasks', async () => {
    inMemoryTasksRepository.create(
      makeTask({
        createdAt: new Date(2024, 1, 24),
      }),
    )

    inMemoryTasksRepository.create(
      makeTask({
        createdAt: new Date(2024, 1, 26),
      }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          createdAt: new Date(2024, 1, 24),
        }),
        expect.objectContaining({
          createdAt: new Date(2024, 1, 26),
        }),
      ]),
    )
  })

  it('should be able to return tasks that contain the query passed in the title and description', async () => {
    inMemoryTasksRepository.create(
      makeTask({
        title: 'Task 01',
        createdAt: new Date(2024, 1, 24),
      }),
    )

    inMemoryTasksRepository.create(
      makeTask({
        description: 'Task 02',
        createdAt: new Date(2024, 1, 26),
      }),
    )
    inMemoryTasksRepository.create(
      makeTask({
        description: 'Description 03',
        createdAt: new Date(2024, 1, 26),
      }),
    )
    inMemoryTasksRepository.create(
      makeTask({
        description: 'Description Task 03',
        createdAt: new Date(2024, 1, 26),
      }),
    )

    const result = await sut.execute({
      page: 1,
      query: 'Task',
    })

    expect(result.value?.tasks).toHaveLength(3)
  })

  it('should to be able to fetch paginated tasks', async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryTasksRepository.create(makeTask())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.value?.tasks).toHaveLength(2)
  })

  it('should be able to search for tasks and return an empty array if none is found', async () => {
    const result = await sut.execute({ page: 1 })

    expect(result.value?.tasks).toEqual([])
  })
})
