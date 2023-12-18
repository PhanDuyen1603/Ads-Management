import { slugify } from "~/utils/string/slug"
const locations = {
  "districts": [
    {
      "wards": [
        {
          "id": 26734,
          "type": {
            "name": "Phường Tân Định",
            "slug": "tan-dinh"
          },
          "names": ["phuongtandinh", "tandinh"]
        },
        {
          "id": 26737,
          "type": {
            "name": "Phường Đa Kao",
            "slug": "da-kao"
          },
          "names": ["phuongdakao", "dakao"]
        },
        {
          "id": 26740,
          "type": {
            "name": "Phường Bến Nghé",
            "slug": "ben-nghe"
          },
          "names": ["phuongbennghe", "bennghe"]
        },
        {
          "id": 26743,
          "type": {
            "name": "Phường Bến Thành",
            "slug": "ben-thanh"
          },
          "names": ["phuongbenthanh", "benthanh"]
        },
        {
          "id": 26746,
          "type": {
            "name": "Phường Nguyễn Thái Bình",
            "slug": "nguyen-thai-binh"
          },
          "names": ["phuongnguyenthaibinh", "nguyenthaibinh"]
        },
        {
          "id": 26749,
          "type": {
            "name": "Phường Phạm Ngũ Lão",
            "slug": "pham-ngu-lao"
          },
          "names": ["phuongphamngulao", "phamngulao"]
        },
        {
          "id": 26752,
          "type": {
            "name": "Phường Cầu Ông Lãnh",
            "slug": "cau-ong-lanh"
          },
          "names": ["phuongcauonglanh", "cauonglanh"]
        },
        {
          "id": 26755,
          "type": {
            "name": "Phường Cô Giang",
            "slug": "co-giang"
          },
          "names": ["phuongcogiang", "cogiang"]
        },
        {
          "id": 26758,
          "type": {
            "name": "Phường Nguyễn Cư Trinh",
            "slug": "nguyen-cu-trinh"
          },
          "names": ["phuongnguyencutrinh", "nguyencutrinh"]
        },
        {
          "id": 26761,
          "type": {
            "name": "Phường Cầu Kho",
            "slug": "cau-kho"
          },
          "names": ["phuongcaukho", "caukho"]
        }
      ],
      "id": 760,
      "type": {
        "name": "Quận 1",
        "slug": "quan-1"
      },
    },
    {
      "wards": [
        {
          "id": 27256,
          "type": {
            "name": "Phường 12",
            "slug": "phuong-12"
          },
          "names": ["phuong12"]
        },
        {
          "id": 27259,
          "type": {
            "name": "Phường 13",
            "slug": "phuong-13"
          },
          "names": ["phuong13"]
        },
        {
          "id": 27262,
          "type": {
            "name": "Phường 09",
            "slug": "phuong-9"
          },
          "names": ["phuong09", "phuong9"]
        },
        {
          "id": 27265,
          "type": {
            "name": "Phường 6",
            "slug": "phuong-6"
          },
          "names": ["phuong06", "phuong6"]
        },
        {
          "id": 27268,
          "type": {
            "name": "Phường 8",
            "slug": "phuong-8"
          },
          "names": ["phuong08", "phuong8"]
        },
        {
          "id": 27271,
          "type": {
            "name": "Phường 10",
            "slug": "phuong-10"
          },
          "names": ["phuong10"]
        },
        {
          "id": 27274,
          "type": {
            "name": "Phường 5",
            "slug": "phuong-5"
          },
          "names": ["phuong05", "phuong5"]
        },
        {
          "id": 27277,
          "type": {
            "name": "Phường 18",
            "slug": "phuong-18"
          },
          "names": ["phuong18"]
        },
        {
          "id": 27280,
          "type": {
            "name": "Phường 14",
            "slug": "phuong-14"
          },
          "names": ["phuong14"]
        },
        {
          "id": 27283,
          "type": {
            "name": "Phường 4",
            "slug": "phuong-4"
          },
          "names": ["phuong04"]
        },
        {
          "id": 27286,
          "type": {
            "name": "Phường 3",
            "slug": "phuong-3"
          },
          "names": ["phuong03", "phuong3"]
        },
        {
          "id": 27289,
          "type": {
            "name": "Phường 16",
            "slug": "phuong-16"
          },
          "names": ["phuong16"]
        },
        {
          "id": 27292,
          "type": {
            "name": "Phường 2",
            "slug": "phuong-2"
          },
          "names": ["phuong02", "phuong2"]
        },
        {
          "id": 27295,
          "type": {
            "name": "Phường 15",
            "slug": "phuong-15"
          },
          "names": ["phuong15"]
        },
        {
          "id": 27298,
          "type": {
            "name": "Phường 1",
            "slug": "phuong-1"
          },
          "names": ["01"]
        }
      ],
      "id": 773,
      "type": {
        "name": "Quận 4",
        "slug": "quan-4"
      }
    },
  ],
  "id": 79,
  "type": {
    "name": "Thành phố",
    "slug": "thanh-pho"
  },
  "names": ["Hồ Chí Minh", "tphcm", "Sài Gòn", "HCM"]
}

const districts = {
  "quan1": "Quận 1",
  "quan4": "Quận 4",
}

const standardize_ward = ({ location, district }) => {
  const slugText = slugify(location)
  const district = Object.keys(districts).find(x => {
    return slugText.indexOf(x) !== -1
  })
  if(district) {
    const wards = locations.districts
      .find(x => slugify(x.type.name) === slugify(district))
      ?.wards

  }
}