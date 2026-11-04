// Editable flavor data and narrative timing. Static reading copy lives in index.html.
window.POP_CONTENT = {
  "flavors": {
    "citrus": {
      "name": "Citrus Static",
      "pair": "Orange + yuzu",
      "description": "Sunny orange meets the sharp little spark of yuzu. Bright, zippy, and pleasantly off-script.",
      "color": "#ffcb52",
      "word": "CITRUS",
      "image": "assets/citrus.svg"
    },
    "berry": {
      "name": "Berry Frequency",
      "pair": "Raspberry + lime",
      "description": "A raspberry riff with a sharp squeeze of lime. A little tart. A little cheeky. Very much its own thing.",
      "color": "#f7a6bc",
      "word": "BERRY",
      "image": "assets/berry.svg"
    },
    "pear": {
      "name": "Pear Anomaly",
      "pair": "Pear + ginger",
      "description": "Mellow pear takes a surprising turn with warming ginger. Soft at first. A little zing at the finish.",
      "color": "#dce997",
      "word": "PEAR",
      "image": "assets/pear.svg"
    }
  },
  "story": {
    "beats": [
      {
        "id": "introduce",
        "range": [
          0,
          0.25
        ],
        "rotation": [
          -13,
          -13
        ],
        "travel": [
          0,
          0
        ],
        "copy": "Orange meets yuzu. Sparks fly."
      },
      {
        "id": "collide",
        "range": [
          0.25,
          0.75
        ],
        "rotation": [
          -13,
          14
        ],
        "travel": [
          0,
          45
        ],
        "copy": "A familiar fruit. An unexpected plus-one."
      },
      {
        "id": "resolve",
        "range": [
          0.75,
          1
        ],
        "rotation": [
          14,
          0
        ],
        "travel": [
          45,
          0
        ],
        "copy": "One bright idea. Find your kind of pop."
      }
    ],
    "desktopTravel": "220svh",
    "mobileTravel": "normal document flow",
    "focalPoint": "center",
    "assetRule": "One responsive SVG per product at every viewport. No video or sequence requests.",
    "hold": "First 25% holds the introduction."
  }
};
