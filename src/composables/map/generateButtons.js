import { ref } from 'vue'

export default function () {
  const showAds = ref(true)
  const showReports = ref(true)

  const stausControlButtons = (map) => {
    // btn 1
    var controlAdInput = document.createElement("INPUT")
    controlAdInput.setAttribute("type", "checkbox")
    controlAdInput.checked = showAds.value
    controlAdInput.classList.add('form-check-input')
    controlAdInput.addEventListener('change', (e) => {
      showAds.value = e.target.checked
    })

    var controlAdLabel = document.createElement('label')
    controlAdLabel.classList.add('form-check-label')
    controlAdLabel.textContent = 'Bảng qc'

    var controlAdButton = document.createElement("div")
    controlAdButton.classList.add('form-check', 'form-switch')
    controlAdButton.appendChild(controlAdInput)
    controlAdButton.appendChild(controlAdLabel)

    // btn 2
    var controlReportInput = document.createElement("INPUT")
    controlReportInput.setAttribute("type", "checkbox")
    controlReportInput.checked = showReports.value
    controlReportInput.classList.add('form-check-input')
    controlReportInput.addEventListener('change', (e) => {
      showReports.value = e.target.checked
    })

    var controlReportLabel = document.createElement('label')
    controlReportLabel.classList.add('form-check-label')
    controlReportLabel.textContent = 'Báo cáo vi phạm'

    var controlReportButton = document.createElement("div")
    controlReportButton.classList.add('form-check', 'form-switch')
    controlReportButton.appendChild(controlReportInput)
    controlReportButton.appendChild(controlReportLabel)

    var groupButtons = document.createElement('div')
    groupButtons.classList.add('form-custom-map')
    groupButtons.appendChild(controlAdButton)
    groupButtons.appendChild(controlReportButton)

    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(groupButtons); // eslint-disable-line no-undef
  }

  return {
    showAds,
    showReports,
    stausControlButtons
  }
}