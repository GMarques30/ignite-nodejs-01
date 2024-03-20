import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface TaskProps {
  title: string
  description: string
  completedAt?: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Task extends Entity<TaskProps> {
  static create(props: Optional<TaskProps, 'createdAt'>, id?: UniqueEntityID) {
    const task = new Task(
      {
        completedAt: null,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: null,
        ...props,
      },
      id,
    )

    return task
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get completedAt() {
    return this.props.completedAt ?? null
  }

  set completedAt(completedAt: Date | null) {
    this.props.completedAt = completedAt
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
