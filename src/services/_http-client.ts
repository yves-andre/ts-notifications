export const httpGet = async (route: string, config: object = {}) => {
  if (!route) throw new Error('a route must be provided')
  const response = await fetch(route, config)
  if (!response.ok) throw new Error(`could not fetch data for url ${route}`)
  return await response.json()
}

export const httpPost = async (route: string, body: any) => {
  if (!route) throw new Error('a route must be provided')
  const response = await fetch(route, {
    body: JSON.stringify({ ...body }),
  })
  if (!response.ok) throw new Error(`sending data failed for ${route}`)
  return await response.json()
}
