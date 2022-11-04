export const httpGet = async (route: string, config: object = {}) => {
  if (!route) throw new Error('a route must be provided')
  const response = await fetch(route, config)
  if (!response.ok) throw new Error(`could not fetch data for url ${route}`)
  return await response.json()
}

export const httpPut = async (route: string, payload: object = {},config: object = {}) => {
  if (!route) throw new Error('a route must be provided')
  const PUTConfig = {
    ...config,
    method: "PUT",
    headers: {
      'Accept': "application/json, text/plain, */*",
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(payload)
  }
  const response = await fetch(route, PUTConfig)
  if (!response.ok) throw new Error(`could not fetch data for url ${route}`)
  return await response.json()
}
