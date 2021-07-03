import * as fs from 'fs'
import { extname, resolve } from 'path'
import { inject, injectable } from 'tsyringe'
import { Service } from '../enum/service'
import { Config } from '../types/config'
import { File } from '../types/file'
import * as mime from 'mime'

@injectable()
export class FileService implements File.Service {
  constructor (@inject(Service.Config) private config : Config.Service) {
  }

  getExtension (filename: string): string {
    return extname(filename).replace(/^\./, '');
  }

  getFullPath (fileName: string): string {
    return resolve(this.config.pathFiles, fileName);
  }

  getMime (fileName: string): string {
    return mime.getType(this.getFullPath(fileName)) ?? '';
  }

  getSize (fileName: string): number {
    return this.exists(fileName)
      ? fs.statSync(this.getFullPath(fileName)).size
      : 0
  }

  exists (fileName: string): boolean {
    return fs.existsSync(this.getFullPath(fileName))
  }

  async saveFile (data: any, path: string): Promise<boolean> {
    return new Promise(resolve => {
      fs.writeFile(path, data, err => {
        resolve(!err)
      })
    })
  }
}
