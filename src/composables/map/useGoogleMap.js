export default function useGoogleMap () {

  const getPhotos = async (placeId) => {
    return await $fetch('/api/map/generateImages', {
      method: 'POST',
      body: {
        placeId
      }
    })
  }
  return {
    getPhotos
  }
}