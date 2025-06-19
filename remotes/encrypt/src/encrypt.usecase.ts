import * as service from './encrypt.service.ts'
import * as algoService from './algoStore.service.ts'
import * as store from './db/store.ts'

export const encryptUsecase = async (content: string) => {
    // const {logger} = await import('./logger.ts') // just to try nested dynamic import
    // logger(`[USECASE] encrypting content...`)
    
    const algos = await algoService.list()
    const encryptAlgo = algoService.select(algos, 'encrypt').name
    const signAlgo = algoService.select(algos, 'sign').name

    const {code, encryptedContent} = service.encrypt(encryptAlgo, signAlgo, content)

    store.set({key: code, value: encryptedContent})
    return code
}