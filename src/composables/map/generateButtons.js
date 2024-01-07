import { iconsList, iconNote } from '~/utils/map'
import useGmapStore from '~/stores/gmap.store';
import { useCloned } from '@vueuse/core'

export default function () {
  const { filterAdLocation } = useLocation()
  const $route = useRoute()
  const { $modal } = useNuxtApp()
  const clone = ref(null)

  const filters = ref({
    countAds: {}
  })

  const modalFilter = reactive({
    isPlanned: 0,
    reportsCount: 0,
    countAds: 0
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
    var controlLocationInput = document.createElement("INPUT")
    controlLocationInput.setAttribute("type", "checkbox")
    controlLocationInput.checked = true
    controlLocationInput.classList.add('form-check-input')
    controlLocationInput.addEventListener('change',async (e) => {
      const value = e.target.checked
      filters.value.reportsCount = {}
      filters.value.reportsCount.gt = !value ? 0 : null
    })

    var controlLocationLabel = document.createElement('label')
    controlLocationLabel.classList.add('form-check-label')
    controlLocationLabel.textContent = 'Hiện báo cáo'

    var controlLocationButton = document.createElement("div")
    controlLocationButton.classList.add('form-check','custom-check')
    controlLocationButton.appendChild(controlLocationInput)
    controlLocationButton.appendChild(controlLocationLabel)

    // btn 3
    var controlReportInput = document.createElement("INPUT")
    controlReportInput.setAttribute("type", "checkbox")
    controlReportInput.checked = true
    controlReportInput.classList.add('form-check-input')
    controlReportInput.addEventListener('change', (e) => {
      const value = e.target.checked
      filters.value.isPlanned = {}
      filters.value.isPlanned.eq = !value ? 0 : 1
      handleFilter()
    })

    var controlReportLabel = document.createElement('label')
    controlReportLabel.classList.add('form-check-label')
    controlReportLabel.textContent = 'Thông tin quy hoạch'

    var controlReportButton = document.createElement("div")
    controlReportButton.classList.add('form-check','custom-check')
    controlReportButton.appendChild(controlReportInput)
    controlReportButton.appendChild(controlReportLabel)

    // groups button
    var groupButtons = document.createElement('div')
    groupButtons.classList.add('form-custom-map')
    groupButtons.appendChild(controlAdButton)
    groupButtons.appendChild(controlLocationButton)
    groupButtons.appendChild(controlReportButton)

    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(groupButtons); // eslint-disable-line no-undef
  }

  const generateListMarkers = (map) => {
    if($route.name.startsWith('admin')) return

    var wrapper = document.createElement('div')
    wrapper.classList.add('list_wrapper', 'card-body')
    const ul = document.createElement('ul')
    ul.classList.add('list-group')
    let list = ''
    const iconsKey = Object.keys(iconsList)
    for (let index = 0; index < iconsKey.length; index++) {
      list += `<li class="list-group-item">
        <div class="icon_wrapper">
          <img src="${iconsList[iconsKey[index]]}">
          <span>${iconNote[iconsKey[index]]}</span>
        </div>
      </li>`  
    }
    ul.innerHTML += list
    wrapper.appendChild(ul)
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(wrapper); // eslint-disable-line no-undef
  }

  const generateFilterButton = (map) => {
    if($route.name.startsWith('admin')) return

    var wrapper = document.createElement('div')
    wrapper.classList.add('card-filter')
    const filterBtn = document.createElement('div')
    filterBtn.classList.add('btn_filter')
    filterBtn.innerHTML += `<span class="mdi mdi-filter-variant"></span>`

    filterBtn.addEventListener('click',async (e) => {
      const { value : filter } = await $modal.show({
        component: 'LayoutFilterMapFilter',
        props: {
          ...modalFilter
        }
      })
      if(!filter) return
      modalFilter.isPlanned = filter.isPlanned
      modalFilter.reportsCount = filter.reportsCount
      modalFilter.countAds = filter.countAds

      const googleMapStore = useGmapStore()
      const { cloned } = useCloned(googleMapStore.allSiteMarkers)
      if(!clone.value) {
        clone.value = cloned.value
      }

      googleMapStore.allSiteMarkers = clone.value
        .filter(x => {
          if(modalFilter.isPlanned === 0) return true
          if(modalFilter.isPlanned === 1) return x.isPlanned === false
          return x.isPlanned === true
        })
        .filter(x => {
          console.log(x)
          if(modalFilter.countAds === 0) return true
          if(modalFilter.countAds === 1) return !x.countAds
          return x.countAds > 0
        })
        .filter(x => {
          if(modalFilter.reportsCount === 0) return true
          if(modalFilter.reportsCount === 1) return !x.reportsCount
          return x.reportsCount && x.reportsCount > 0
        })

    })

    wrapper.appendChild(filterBtn)
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(wrapper)
  }

  return {
    stausControlButtons,
    generateListMarkers,
    generateFilterButton
  }
}