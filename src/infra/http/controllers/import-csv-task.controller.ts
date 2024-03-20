import {
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { parse } from 'csv-parse'
import { createReadStream } from 'fs'
import { Express } from 'express'
import { CreateTaskUseCase } from '../../../domain/application/use-cases/create-task'
import { diskStorage } from 'multer'

@Controller('/import')
export class ImportCsvTaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'csv',
      }),
    }),
  )
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.csv' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const stream = createReadStream(file.path)

    const csvParse = parse({
      delimiter: ',',
      skipEmptyLines: true,
      fromLine: 2,
    })

    const linesParse = stream.pipe(csvParse)

    for await (const line of linesParse) {
      const [title, description] = line

      await this.createTaskUseCase.execute({
        title,
        description,
      })
    }
  }
}
