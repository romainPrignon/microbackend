import Pino from 'pino'

const pino = Pino({
    base: null,
    timestamp: false,
}, Pino.destination({
    sync: true,
}))

export const logger = (message: string) => {
    pino.info(message)
}