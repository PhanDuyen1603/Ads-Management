export const defaultLocation = {
  position: {
    lat: 10.766959,
    lng: 106.694979
  },
}

const district1Wards = [
  {
    name: "Bến Nghé",
    slug: "ben-nghe",
  },
  {
    name: "Bến Thành",
    slug: "ben-thanh",
  },
  {
    name: "Cầu Kho",
    slug: "cau-kho",
  },
  {
    name: "Cầu Ông Lãnh",
    slug: "cau-ong-lanh",
  },
  {
    name: "Cô Giang",
    slug: "co-giang",
  },
  {
    name: "Đa Kao",
    slug: "da-kao",
  },
  {
    name: "Nguyễn Cư Trinh",
    slug: "nguyen-cu-trinh",
  },
  {
    name: "Nguyễn Thái Bình",
    slug: "nguyen-thai-binh",
  },
  {
    name: "Phạm Ngũ Lão",
    slug: "pham-ngu-lao",
  },
  {
    name: "Tân Định",
    slug: "tan-dinh",
  },
];

const district4Wards = () => {
  const res = []
  for (let index = 0; index < 18; index++) {
    res.push({
      name: `phường ${index + 1}`,
      slug: `phuong-${index + 1}`
    })
  }
  return res
}

const districts = [
  {
    name: 'quận 1',
    slug: 'quan-1',
    wards: district1Wards
  },
  {
    name: 'quận 4',
    slug: 'quan-4',
    wards: district4Wards()
  },
]

export { district1Wards, district4Wards, districts}

