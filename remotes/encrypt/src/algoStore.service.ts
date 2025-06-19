type Algo = {
    type: 'encrypt' | 'sign'
    name: string
}

export const list = async () => {
    const res = await fetch('http://localhost:3000/algo', {headers: { 'x-random': Math.random().toString()}})
    if (!res.ok) throw new Error(`fail to fetch list of algo`)
    return  res.json()
}

export const select = (algoList: Array<Algo>, algoType: 'encrypt' | 'sign') => {
    return algoList.filter(algo => algo.type === algoType)?.[0]
}