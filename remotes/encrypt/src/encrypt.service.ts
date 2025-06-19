import { createCipheriv, createHash } from 'node:crypto'

export const encrypt = (encryptAlgo: string, signAlgo: string, content: string) => {
    const encryptedContent = encryptContent(encryptAlgo, content)
    const code = makeCode(signAlgo, encryptedContent)

    return {code, encryptedContent}
}

const makeCode = (algo, data) => createHash(algo).update(data).digest('base64')

const encryptContent = (algo, data) => {
    const key = makeKey()
    const iv = makeIv()

    const cipher = createCipheriv(algo, key, iv)
    const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex')

    return btoa(encrypted)
}

const makeKey = () => {
    return createHash('sha512')
        .update(process.env.SECRET_KEY)
        .digest('hex')
        .substring(0, 32)
}

const makeIv = () => {
    return createHash('sha512')
        .update(process.env.SECRET_KEY)
        .digest('hex')
        .substring(0, 16)
}   