import { describe, it, expect } from 'vitest'
import { Either, left, right } from './either'

function doSomething(shoudlSuccess: boolean): Either<string, string> {
  if (shoudlSuccess) {
    return right('Success')
  }

  return left('Error')
}

describe('Either tests', () => {
  it('Should be able a sucess result', () => {
    const result = doSomething(true)

    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
  })

  it('Should be able a error result', () => {
    const result = doSomething(false)

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
  })
})
