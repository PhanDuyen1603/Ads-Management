const onFocusMap = (item, $map) => {
  $map.onCenterMap?.({ lat: item.lat, lng: item.lng })
}

export { onFocusMap }