import axios from 'axios'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const googleMapKey = config.public.googleMapApiKey
  const { placeId = null } = body
  if (!placeId)
    return {
      error: true,
      errors: ['Invalid placeId.'],
      data: []
    }

  let options = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://places.googleapis.com/v1/places/' + placeId,
    headers: { 
      'Content-Type': 'application/json', 
      'X-Goog-Api-Key': googleMapKey, 
      'X-Goog-FieldMask': 'id,displayName,photos'
    }
  };
  try {
    const res = await axios.request(options)
    const photos = res.data.photos.map(x => {
      return `https://places.googleapis.com/v1/${x.name}/media?key=${googleMapKey}&maxHeightPx=800`
    })
    return {
      success: true,
      data: photos,
      message: 'success.'
    }
  } catch (error) {
    console.log({error})
    return {
      error: true,
      errors: ['Something went wrong.'],
      message: error,
      data: []
    }
  }

})