import os
import json
Legend = [
    "001",
    "002",
    "003",
    "004",
    "005",
    "006",
    "007",
    "008",
    "009",
    "132",
    "144",
    "145",
    "146",
    "147",
    "148",
    "149",
    "150",
    "151",
    "152",
    "153",
    "154",
    "155",
    "156",
    "157",
    "158",
    "159",
    "160",
    "243",
    "244",
    "245",
    "246",
    "247",
    "248",
    "249",
    "250",
    "251",
    "252",
    "253",
    "254",
    "255",
    "256",
    "257",
    "258",
    "259",
    "260",
    "350",
    "371",
    "372",
    "373",
    "374",
    "375",
    "376",
    "377",
    "378",
    "379",
    "380",
    "381",
    "382",
    "383",
    "384",
    "385",
    "386",
    "387",
    "388",
    "389",
    "390",
    "391",
    "392",
    "393",
    "394",
    "395",
    "443",
    "444",
    "445",
    "447",
    "448",
    "479",
    "480",
    "481",
    "482",
    "483",
    "484",
    "485",
    "486",
    "487",
    "488",
    "489",
    "490",
    "491",
    "492",
    "493",
    "494",
    "495",
    "496",
    "497",
    "498",
    "499",
    "500",
    "501",
    "502",
    "503",
    "633",
    "634",
    "635",
    "638",
    "639",
    "640",
    "641",
    "642",
    "643",
    "644",
    "645",
    "646",
    "647",
    "648",
    "649",
    "650",
    "651",
    "652",
    "653",
    "654",
    "655",
    "656",
    "657",
    "658",
    "704",
    "705",
    "706",
    "716",
    "717",
    "718",
    "719",
    "720",
    "721",
    "722",
    "723",
    "724",
    "725",
    "726",
    "727",
    "728",
    "729",
    "730",
    "782",
    "783",
    "784",
    "785",
    "786",
    "787",
    "788",
    "789",
    "790",
    "791",
    "792",
    "793",
    "794",
    "795",
    "796",
    "797",
    "798",
    "799",
    "800",
    "801",
    "802",
    "803",
    "804",
    "805",
    "806",
    "807",
    "808",
    "809",
    "810",
    "811",
    "812",
    "813",
    "814",
    "815",
    "816",
    "817",
    "818",
    "885",
    "886",
    "887",
    "888",
    "889",
    "890",
    "891",
    "892",
    "893",
    "894",
    "895",
    "896",
    "897",
    "898",
    "905",
    "906",
    "907",
    "908",
    "909",
    "910",
    "911",
    "912",
    "913",
    "914",
    "993",
    "995",
    "996",
    "997",
    "998",
    "1005",
    "1006",
    "1007",
    "1008"
]

base_path = "\\\?\\" + os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(base_path, 'want_catch.json'), 'w', encoding='utf-8') as f:
    json.dump(Legend, f)