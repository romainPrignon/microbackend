export const list = async () => {
    return [
        {
            type: 'encrypt',
            name: 'aes-256-cbc',
        },
        {
            type: 'encrypt',
            name: 'des-cbc',
        },
        {
            type: 'sign',
            name: 'sha256',
        },
        {
            type: 'sign',
            name: 'md5',
        }
    ]
}
