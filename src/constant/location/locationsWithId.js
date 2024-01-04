const districts = [
  {
    id: "65894bf5837b369ea222e92f",
    label: "1",
  },
  {
    id: "65894c1f837b369ea222e933",
    label: "Bình Thạnh",
  },
  // {
  //     "id": "65894c26837b369ea222e935",
  //     "label": "Bình Chánh",
  // },
  // {
  //     "id": "658bfd6c3414b78df26ff27a",
  //     "label": "3",
  // },
  // {
  //     "id": "658bff897988d005495c3382",
  //     "label": "4",
  // },
  // {
  //     "id": "658e7521492fb1626e18659f",
  //     "label": "2",
  // }
];

const wards = [
  {
    id: "65897a662992505116474a10",
    label: "Bến Nghé",
    district: {
      id: "65894bf5837b369ea222e92f",
      label: "1",
    },
  },
  {
    id: "65897bba0c652f18ce27d803",
    label: "Bến Thành",
    district: {
      id: "65894bf5837b369ea222e92f",
      label: "1",
    },
  },
  {
    id: "65897bc30c652f18ce27d806",
    label: "Cầu Kho",
    district: {
      id: "65894bf5837b369ea222e92f",
      label: "1",
    },
  },
  {
    id: "65897bc70c652f18ce27d809",
    label: "Cầu Ông Lãnh",
    district: {
      id: "65894bf5837b369ea222e92f",
      label: "1",
    },
  },
  {
    id: "65897bd10c652f18ce27d80c",
    label: "Đa Kao",
    district: {
      id: "65894bf5837b369ea222e92f",
      label: "1",
    },
  },
  {
    id: "65897bd90c652f18ce27d80f",
    label: "Nguyễn Cư Trinh",
    district: {
      id: "65894bf5837b369ea222e92f",
      label: "1",
    },
  },
  {
    id: "65897bde0c652f18ce27d812",
    label: "Nguyễn Thái Bình",
    district: {
      id: "65894bf5837b369ea222e92f",
      label: "1",
    },
  },
  {
    id: "65897be40c652f18ce27d815",
    label: "Phạm Ngũ Lão",
    district: {
      id: "65894bf5837b369ea222e92f",
      label: "1",
    },
  },
  {
    id: "65897beb0c652f18ce27d818",
    label: "Tân Định",
    district: {
      id: "65894bf5837b369ea222e92f",
      label: "1",
    },
  },
  {
    id: "658a9bcdfb8077138d4f6e95",
    label: "Tân Định2",
    district: {
      id: "65894bf5837b369ea222e92f",
      label: "1",
    },
  },
  {
    id: "659062ea0d85e0e18aa0d179",
    label: "1",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063060d85e0e18aa0d181",
    label: "2",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063080d85e0e18aa0d185",
    label: "3",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "6590630a0d85e0e18aa0d189",
    label: "4",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "6590630c0d85e0e18aa0d18d",
    label: "5",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "6590630e0d85e0e18aa0d191",
    label: "6",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063100d85e0e18aa0d195",
    label: "7",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063130d85e0e18aa0d199",
    label: "8",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063150d85e0e18aa0d19d",
    label: "9",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063180d85e0e18aa0d1a1",
    label: "10",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "6590631b0d85e0e18aa0d1a5",
    label: "11",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "6590631d0d85e0e18aa0d1a9",
    label: "12",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063210d85e0e18aa0d1ad",
    label: "13",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063240d85e0e18aa0d1b1",
    label: "14",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063260d85e0e18aa0d1b5",
    label: "15",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063280d85e0e18aa0d1b9",
    label: "16",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "6590632a0d85e0e18aa0d1bd",
    label: "17",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "6590632c0d85e0e18aa0d1c1",
    label: "18",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "6590632f0d85e0e18aa0d1c5",
    label: "19",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063320d85e0e18aa0d1c9",
    label: "20",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063330d85e0e18aa0d1cd",
    label: "21",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063350d85e0e18aa0d1d1",
    label: "22",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063380d85e0e18aa0d1d5",
    label: "23",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "6590633a0d85e0e18aa0d1d9",
    label: "24",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "6590633c0d85e0e18aa0d1dd",
    label: "25",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "6590633e0d85e0e18aa0d1e1",
    label: "26",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063400d85e0e18aa0d1e5",
    label: "27",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
  {
    id: "659063420d85e0e18aa0d1e9",
    label: "28",
    district: {
      id: "65894c1f837b369ea222e933",
      label: "Bình Thạnh",
    },
  },
];

export { districts, wards }