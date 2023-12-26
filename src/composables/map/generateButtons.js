export default function () {
  const { filterAdLocation } = useLocation()
  const $route = useRoute()

  const filters = ref({
    countAds: {}
  })

  const handleFilter = async () => {
    console.log({filters: filters.value})
    await filterAdLocation({ conditions: filters.value })
  }

  const stausControlButtons = (map) => {
    if($route.name.startsWith('admin')) return
    // btn 1
    var controlAdInput = document.createElement("INPUT")
    controlAdInput.setAttribute("type", "checkbox")
    controlAdInput.checked = true
    controlAdInput.classList.add('form-check-input')
    controlAdInput.addEventListener('change', (e) => {
      const value = e.target.checked
      filters.value.countAds = {}
      filters.value.countAds.eq = value ? null : 0
      handleFilter()
    })

    var controlAdLabel = document.createElement('label')
    controlAdLabel.classList.add('form-check-label')
    controlAdLabel.textContent = 'Bảng qc'

    var controlAdButton = document.createElement("div")
    controlAdButton.classList.add('form-check','custom-check')
    controlAdButton.appendChild(controlAdInput)
    controlAdButton.appendChild(controlAdLabel)

    // btn 2
    var controlReportInput = document.createElement("INPUT")
    controlReportInput.setAttribute("type", "checkbox")
    controlReportInput.checked = true
    controlReportInput.classList.add('form-check-input')
    controlReportInput.addEventListener('change', (e) => {
      const value = e.target.checked
      filters.value.countAds = {}
      filters.value.countAds.gt = !value ? 0 : null
      handleFilter()
    })

    var controlReportLabel = document.createElement('label')
    controlReportLabel.classList.add('form-check-label')
    controlReportLabel.textContent = 'Hiện điểm quảng cáo'

    var controlReportButton = document.createElement("div")
    controlReportButton.classList.add('form-check','custom-check')
    controlReportButton.appendChild(controlReportInput)
    controlReportButton.appendChild(controlReportLabel)

    var groupButtons = document.createElement('div')
    groupButtons.classList.add('form-custom-map')
    groupButtons.appendChild(controlAdButton)
    groupButtons.appendChild(controlReportButton)

    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(groupButtons); // eslint-disable-line no-undef
  }

  return {
    stausControlButtons
  }
}