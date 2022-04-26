import childProcess from 'child_process'
import fs from 'fs-extra'

function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => fs.copy(src, dest, (err) => (err ? rej(err) : res())))
}

function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => fs.remove(loc, (err: any) => (err ? rej(err) : res())))
}

function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) =>
    childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      if (stdout) {
        console.info(stdout)
      }
      if (stderr) {
        console.warn(stderr)
      }
      return err ? rej(err) : res()
    }),
  )
}

;(async () => {
  try {
    await remove('./dist/')
    await exec('tsc --build tsconfig.json', './')
  } catch (err: any) {
    console.error(err)
  }
})()
