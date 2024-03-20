import { UseCaseError } from '../use-case-errors'

export class RequiredFieldsError extends Error implements UseCaseError {
  constructor() {
    super('Required fields')
  }
}
