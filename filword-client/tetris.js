var tetris = (function() {


var singleColor = 'white';

var tetrisGroups = [
  { /*0*/
    cells: [[0,0], [0,1], [1,0], [2,0]],
    coords: {
      
        'angle': 155,
        'dist': 817
      
    },
    rotate: -90
  }, { /*1*/
    cells: [[1,1], [1,2], [2,1], [3,1], [3,0]],
    coords: {
      
        'angle': 32,
        'dist': 756
      
    },
    rotate: 0
  }, { /*2*/
    cells: [[4,0]],
    fill: singleColor,
    coords: {
      
        'angle': 120,
        'dist': 428
      
    }
  }, { /*3*/
    cells: [[5,1], [5,0], [6,0], [7,0], [7,1]],
    coords: {
      
        'angle': 52,
        'dist': 485
    },
    rotate: -90
  }, { /*4*/
    cells: [[8,1], [8,0], [9,0], [10,0], [10,1]],
    coords: {
      
        'angle': 141,
        'dist': 620
      
    },
    rotate: 0
  }, { /*5*/
    cells: [[11,0], [11,1], [11,2]],
    coords: {
      
        'angle': 34,
        'dist': 471
      
    },
    rotate: 90
  }, { /*6*/
    cells: [[4,1], [4,2], [3,2], [2,2]],
    coords: {
      
        'angle': 89,
        'dist': 368
      
    },
    rotate: -90
  }, { /*7*/
    cells: [[6,1], [6,2], [5,2], [5,3]],
    coords: {
      
        'angle': 5,
        'dist': 855
      
    },
    rotate: 90
  }, { /*8*/
    cells: [[9,1], [9,2], [9,3], [10,3]],
    coords: {
      
        'angle': 24,
        'dist': 868
      
    },
    rotate: 180
  }, { /*9*/
    cells: [[0,2]],
    fill: singleColor,
    coords: {
      
        'angle': 146,
        'dist': 699
      
    }
  }, { /*10*/
    cells: [[7,2]],
    fill: singleColor,
    coords: {
      
        'angle': 71,
        'dist': 450
      
    }
  }, { /*11*/
    cells: [[8,2], [8,3], [8,4], [7,4]],
    coords: {
      
        'angle': -37,
        'dist': 377
      
    },
    rotate: 180
  }, { /*12*/
    cells: [[10,2]],
    fill: singleColor,
    coords: {
      
        'angle': 15,
        'dist': 800
      
    }
  }, { /*13*/
    cells: [[0,3], [1,3], [0,4], [0,5]],
    coords: {
      
        'angle': 166,
        'dist': 805
      
    },
    rotate: 90
  }, { /*14*/
    cells: [[2,3], [2,4], [2,5], [1,5], [3,3]],
    coords: {
      
        'angle': 117,
        'dist': 310
      
    },
    rotate: 90
  }, { /*15*/
    cells: [[4,3], [4,4], [4,5], [3,5]],
    coords: {
      
        'angle': -157,
        'dist': 480
      
    },
    rotate: -90
  }, { /*16*/
    cells: [[6,3], [7,3], [6,4], [6,5], [5,5]],
    coords: {
      
        'angle': -152,
        'dist': 730

    },
    rotate: 0
  }, { /*17*/
    cells: [[11,3]],
    fill: singleColor,
    coords: {
      
        'angle': -5,
        'dist': 795
      
    }
  }, { /*18*/
    cells: [[1,4]],
    fill: singleColor,
    coords: {
      
        'angle': 170,
        'dist': 660
      
    }
  }, { /*19*/
    cells: [[3,4]],
    fill: singleColor,
    coords: {
      
        'angle': 165,
        'dist': 365
      
    }
  }, { /*20*/
    cells: [[5,4]],
    fill: singleColor,
    coords: {
      
        'angle': 88,
        'dist': 237
      
    }
  }, { /*21*/
    cells: [[9,4], [10,4], [11,4], [9,5], [8,5]],
    coords: {
      
        'angle': -10,
        'dist': 500
      
    },
    rotate: 90
  }, { /*22*/
    cells: [[7,5]],
    fill: singleColor,
    coords: {
      
        'angle': 36,
        'dist': 390
    
    }
  }, { /*23*/
    cells: [[10,5], [10,6], [9,6], [9,7]],
    coords: {
      
        'angle': -40,
        'dist': 550
      
    },
    rotate: 90
  }, { /*24*/
    cells: [[11,5], [11,6], [11,7], [10,7]],
    coords: {
      
        'angle': -8,
        'dist': 629
      
    },
    rotate: 90
  }, { /*25*/
    cells: [[0,6], [1,6], [1,7], [2,7]],
    coords: {
      
        'angle': 49,
        'dist': 383
      
    },
    rotate: 0
  }, { /*26*/
    cells: [[2,6]],
    fill: singleColor,
    coords: {
      
        'angle': -140,
        'dist': 235
      
    }
  }, { /*27*/
    cells: [[3,6], [4,6], [4,7], [4,8]],
    coords: {
      
        'angle': 146,
        'dist': 479
      
    },
    rotate: 0
  }, { /*28*/
    cells: [[5,6], [5,7], [6,6], [7,6]],
    coords: {
      
        'angle': 18,
        'dist': 504
      
    },
    rotate: 0
  }, { /*29*/
    cells: [[8,6]],
    fill: singleColor,
    coords: {
      
        'angle': 8,
        'dist': 579
      
    }
  }, { /*30*/
    cells: [[0,7]],
    fill: singleColor,
    coords: {
      
        'angle': -163,
        'dist': 684
      
    }
  }, { /*31*/
    cells: [[3,7], [3,8], [2,8], [1,8]],
    coords: {
      
        'angle': -160,
        'dist': 875
      
    },
    rotate: -0
  }, { /*32*/
    cells: [[6,7], [7,7], [8,7], [6,8], [5,8]],
    coords: {
      
        angle: -177,
        dist: 334
      
    },
    rotate: 0
  }, { /*33*/
    cells: [[0,8], [0,9], [1,9], [1,10]],
    coords: {
      
        'angle': 154,
        'dist': 633
      
    },
    rotate: 90
  }, { /*34*/
    cells: [[7,8]],
    fill: singleColor,
    coords: {
      
        'angle': -53,
        'dist': 319
      
    }
  }, { /*35*/
    cells: [[8,8], [8,9], [9,9], [10,9], [10,8]],
    coords: {
      
        'angle': -8,
        'dist': 815
      
    },
    rotate: 180
  }, { /*36*/
    cells: [[9,8]],
    fill: singleColor,
    coords: {
      
        'angle': -4,
        'dist': 205
      
    }
  }, { /*37*/
    cells: [[11,8]],
    fill: singleColor,
    coords: {
      
        'angle': -20,
        'dist': 872
      
    }
  }, { /*38*/
    cells: [[2,9]],
    fill: singleColor,
    coords: {
      
        'angle': -145,
        'dist': 474
      
    }
  }, { /*39*/
    cells: [[3,9], [4,9], [3,10], [3,11]],
    coords: {
      
        'angle': -124,
        'dist': 371
      
    },
    rotate: 180
  }, { /*40*/
    cells: [[5,9], [5,10], [4,10], [4,11]],
    coords: {
      
        'angle': -85,
        'dist': 208
      
    },
    rotate: 90
  }, { /*41*/
    cells: [[6,9], [7,9], [7,10]],
    coords: {
      
        'angle': 11,
        'dist': 361
      
    },
    rotate: 90
  }, { /*42*/
    cells: [[11,9], [11,10], [11,11], [10,11]],
    coords: {
      
        'angle': -24,
        'dist': 696
      
    },
    rotate: 180
  }, { /*43*/
    cells: [[0,10], [0,11], [1,11], [2,11], [2,10]],
    coords: {
      
        'angle': 166,
        'dist': 458
      
    },
    rotate: -90
  }, { /*44*/
    cells: [[5,11], [6,11], [6,10]],
    coords: {
      
        'angle': -181,
        'dist': 721
      
    },
    rotate: -90
  }, { /*45*/
    cells: [[8,10]],
    fill: singleColor,
    coords: {
      
        'angle': -180,
        'dist': 899
      
    }
  }, { /*46*/
    cells: [[9,10], [10,10], [9,11], [8,11]],
    coords: {
      
        'angle': 25,
        'dist': 707
      
    },
    rotate: 90
  }, { /*47*/
    cells: [[7, 11]],
    fill: singleColor,
    coords: {
      
        'angle': -20,
        'dist': 551
      
    }
  }, 


  { /*inactive*/
    cells: [[0, 0]],
    coords: {
        'angle': 90,
        'dist': 500
    },
    inactive: true
  },{ /*inactive*/
    cells: [[0, 0], [0, 1], [1, 0], [2, 0], [2, 1]],
    coords: {
        'angle': 110,
        'dist': 550
    },
    inactive: true
  },{ /*inactive*/
    cells: [[0, 0], [1, 0], [0, 1]],
    coords: {
        'angle': 70,
        'dist': 550
    },
    inactive: true
  },
];

tetrisGroups = [{ /*0*/
  cells: [[0, 0], [0, 1], [1, 0], [2, 0]],
  coords: {

    'angle': 155,
    'dist': 817

  },
  rotate: -90
}, { /*1*/
  cells: [[1, 1], [1, 2], [2, 1], [3, 1], [3, 0]],
  coords: {

    'angle': 32,
    'dist': 756

  },
  rotate: 0
}, { /*2*/
  cells: [[4, 0]],
  fill: singleColor,
  coords: {

    'angle': 120,
    'dist': 428

  }
}, { /*3*/
  cells: [[5, 1], [5, 0], [6, 0], [7, 0], [7, 1]],
  coords: {

    'angle': 48,
    'dist': 529
  },
  rotate: -90
}, { /*4*/
  cells: [[8, 1], [8, 0], [9, 0], [10, 0], [10, 1]],
  coords: {

    'angle': 141,
    'dist': 620

  },
  rotate: 0
}, { /*5*/
  cells: [[11, 0], [11, 1], [11, 2]],
  coords: {

    'angle': 34,
    'dist': 471

  },
  rotate: 90
}, { /*6*/
  cells: [[4, 1], [4, 2], [3, 2], [2, 2]],
  coords: {

    'angle': 89,
    'dist': 368

  },
  rotate: -90
}, { /*7*/
  cells: [[6, 1], [6, 2], [5, 2], [5, 3]],
  coords: {

    'angle': 5,
    'dist': 855

  },
  rotate: 90
}, { /*8*/
  cells: [[9, 1], [9, 2], [9, 3], [10, 3]],
  coords: {

    'angle': 24,
    'dist': 868

  },
  rotate: 180
}, { /*9*/
  cells: [[0, 2]],
  fill: singleColor,
  coords: {

    'angle': 146,
    'dist': 699

  }
}, { /*10*/
  cells: [[7, 2]],
  fill: singleColor,
  coords: {

    'angle': 71,
    'dist': 450

  }
}, { /*11*/
  cells: [[8, 2], [8, 3], [8, 4], [7, 4]],
  coords: {

    'angle': -37,
    'dist': 377

  },
  rotate: 180
}, { /*12*/
  cells: [[10, 2]],
  fill: singleColor,
  coords: {

    'angle': 15,
    'dist': 800

  }
}, { /*13*/
  cells: [[0, 3], [1, 3], [0, 4], [0, 5]],
  coords: {

    'angle': 166,
    'dist': 805

  },
  rotate: 90
}, { /*14*/
  cells: [[2, 3], [2, 4], [2, 5], [1, 5], [3, 3]],
  coords: {

    'angle': 117,
    'dist': 310

  },
  rotate: 90
}, { /*15*/
  cells: [[4, 3], [4, 4], [4, 5], [3, 5]],
  coords: {

    'angle': -157,
    'dist': 480

  },
  rotate: -90
}, { /*16*/
  cells: [[6, 3], [7, 3], [6, 4], [6, 5], [5, 5]],
  coords: {

    'angle': -152,
    'dist': 730

  },
  rotate: 0
}, { /*17*/
  cells: [[11, 3]],
  fill: singleColor,
  coords: {

    'angle': -5,
    'dist': 795

  }
}, { /*18*/
  cells: [[1, 4]],
  fill: singleColor,
  coords: {

    'angle': 170,
    'dist': 660

  }
}, { /*19*/
  cells: [[3, 4]],
  fill: singleColor,
  coords: {

    'angle': 165,
    'dist': 365

  }
}, { /*20*/
  cells: [[5, 4]],
  fill: singleColor,
  coords: {

    'angle': 88,
    'dist': 237

  }
}, { /*21*/
  cells: [[9, 4], [10, 4], [11, 4], [9, 5], [8, 5]],
  coords: {

    'angle': -10,
    'dist': 500

  },
  rotate: 90
}, { /*22*/
  cells: [[7, 5]],
  fill: singleColor,
  coords: {

    'angle': 36,
    'dist': 390

  }
}, { /*23*/
  cells: [[10, 5], [10, 6], [9, 6], [9, 7]],
  coords: {

    'angle': -40,
    'dist': 550

  },
  rotate: 90
}, { /*24*/
  cells: [[11, 5], [11, 6], [11, 7], [10, 7]],
  coords: {

    'angle': -8,
    'dist': 629

  },
  rotate: 90
}, { /*25*/
  cells: [[0, 6], [1, 6], [1, 7], [2, 7]],
  coords: {

    'angle': 49,
    'dist': 383

  },
  rotate: 0
}, { /*26*/
  cells: [[2, 6]],
  fill: singleColor,
  coords: {

    'angle': -140,
    'dist': 235

  }
}, { /*27*/
  cells: [[3, 6], [4, 6], [4, 7], [4, 8]],
  coords: {

    'angle': 146,
    'dist': 479

  },
  rotate: 0
}, { /*28*/
  cells: [[5, 6], [5, 7], [6, 6], [7, 6]],
  coords: {

    'angle': 18,
    'dist': 504

  },
  rotate: 0
}, { /*29*/
  cells: [[8, 6]],
  fill: singleColor,
  coords: {

    'angle': 8,
    'dist': 579

  }
}, { /*30*/
  cells: [[0, 7]],
  fill: singleColor,
  coords: {

    'angle': -163,
    'dist': 684

  }
}, { /*31*/
  cells: [[3, 7], [3, 8], [2, 8], [1, 8]],
  coords: {

    'angle': -160,
    'dist': 875

  },
  rotate: -0
}, { /*32*/
  cells: [[6, 7], [7, 7], [8, 7], [6, 8], [5, 8]],
  coords: {

    angle: -177,
    dist: 334

  },
  rotate: 0
}, { /*33*/
  cells: [[0, 8], [0, 9], [1, 9], [1, 10]],
  coords: {

    'angle': 154,
    'dist': 633

  },
  rotate: 90
}, { /*34*/
  cells: [[7, 8]],
  fill: singleColor,
  coords: {

    'angle': -53,
    'dist': 319

  }
}, { /*35*/
  cells: [[8, 8], [8, 9], [9, 9], [10, 9], [10, 8]],
  coords: {

    'angle': -8,
    'dist': 815

  },
  rotate: 180
}, { /*36*/
  cells: [[9, 8]],
  fill: singleColor,
  coords: {

    'angle': -4,
    'dist': 205

  }
}, { /*37*/
  cells: [[11, 8]],
  fill: singleColor,
  coords: {

    'angle': -20,
    'dist': 872

  }
}, { /*38*/
  cells: [[2, 9]],
  fill: singleColor,
  coords: {

    'angle': -145,
    'dist': 474

  }
}, { /*39*/
  cells: [[3, 9], [4, 9], [3, 10], [3, 11]],
  coords: {

    'angle': -124,
    'dist': 371

  },
  rotate: 180
}, { /*40*/
  cells: [[5, 9], [5, 10], [4, 10], [4, 11]],
  coords: {

    'angle': -85,
    'dist': 208

  },
  rotate: 90
}, { /*41*/
  cells: [[6, 9], [7, 9], [7, 10]],
  coords: {

    'angle': 11,
    'dist': 361

  },
  rotate: 90
}, { /*42*/
  cells: [[11, 9], [11, 10], [11, 11], [10, 11]],
  coords: {

    'angle': -24,
    'dist': 696

  },
  rotate: 180
}, { /*43*/
  cells: [[0, 10], [0, 11], [1, 11], [2, 11], [2, 10]],
  coords: {

    'angle': 166,
    'dist': 458

  },
  rotate: -90
}, { /*44*/
  cells: [[5, 11], [6, 11], [6, 10]],
  coords: {

    'angle': -181,
    'dist': 721

  },
  rotate: -90
}, { /*45*/
  cells: [[8, 10]],
  fill: singleColor,
  coords: {

    'angle': -180,
    'dist': 899

  }
}, { /*46*/
  cells: [[9, 10], [10, 10], [9, 11], [8, 11]],
  coords: {

    'angle': 25,
    'dist': 707

  },
  rotate: 90
}, { /*47*/
  cells: [[7, 11]],
  fill: singleColor,
  coords: {

    'angle': -20,
    'dist': 551

  }
},

/*inactive*/
/* top */
{
  cells: [[0, 0]],
  coords: {
    'angle': 144,
    'dist': 995
  },
  inactive: true
}, {
  cells: [[0, 0], [0, 1], [0, 2], [1, 2]],
  coords: {
    'angle': 135,
    'dist': 1100
  },
  inactive: true
}, {
  cells: [[0, 2], [1, 2], [1, 1], [1, 0]],
  coords: {
    'angle': 137,
    'dist': 855
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': 127,
    'dist': 1025
  },
  inactive: true
}, {
  cells: [[0, 2], [0, 1], [1, 1], [2, 1], [2, 0]],
  coords: {
    'angle': 126,
    'dist': 899
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': 133,
    'dist': 685
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': 121,
    'dist': 720
  },
  inactive: true
}, {
  cells: [[0, 0], [1, 0], [2, 0]],
  coords: {
    'angle': 115,
    'dist': 910
  },
  inactive: true
}, {
  cells: [[0, 0], [1, 0], [1, 1], [1, 2], [0, 2]],
  coords: {
    'angle': 110,
    'dist': 768
  },
  inactive: true
}, {
  cells: [[0, 2], [0, 1], [1, 1], [1, 0]],
  coords: {
    'angle': 109,
    'dist': 560
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': 98,
    'dist': 710
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': 102,
    'dist': 850
  },
  inactive: true
}, {
  cells: [[0, 0], [1, 0], [1, 1], [2, 1]],
  coords: {
    'angle': 84,
    'dist': 530
  },
  inactive: true
}, {
  cells: [[0, 0], [0, 1], [0, 2], [1, 2]],
  coords: {
    'angle': 83,
    'dist': 717
  },
  inactive: true
}, {
  cells: [[0, 0], [1, 0], [1, 1], [2, 1]],
  coords: {
    'angle': 85,
    'dist': 840
  },
  inactive: true
}, {
  cells: [[0, 2], [0, 1], [0, 0], [1, 0]],
  coords: {
    'angle': 65,
    'dist': 657
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': 68,
    'dist': 790
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': 48,
    'dist': 750
  },
  inactive: true
}, {
  cells: [[0, 0], [0, 1], [1, 1], [2, 1], [2, 0]],
  coords: {
    'angle': 55,
    'dist': 880
  },
  inactive: true
}, {
  cells: [[0, 0], [1, 0], [2, 0]],
  coords: {
    'angle': 57,
    'dist': 990
  },
  inactive: true
}, {
  cells: [[0, 2], [1, 2], [1, 1], [1, 0], [2, 0]],
  coords: {
    'angle': 39,
    'dist': 895
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': 46,
    'dist': 1010
  },
  inactive: true
}, {
  cells: [[0, 0], [1, 0], [1, 1], [1, 2]],
  coords: {
    'angle': 42,
    'dist': 1160
  },
  inactive: true
}, {
  cells: [[0, 1], [0, 0], [1, 0], [2, 0]],
  coords: {
    'angle': 32,
    'dist': 1070
  },
  inactive: true
},

/* bottom */
{
  cells: [[0, 0], [0, 1], [0, 2], [1, 2]],
  coords: {
    'angle': -142,
    'dist': 950
  },
  inactive: true
}, {
  cells: [[0, 0], [1, 0], [2, 0], [2, 1]],
  coords: {
    'angle': -137,
    'dist': 1100
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': -137,
    'dist': 810
  },
  inactive: true
}, {
  cells: [[0, 1], [1, 1], [1, 0], [2, 0]],
  coords: {
    'angle': -129,
    'dist': 920
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': -128,
    'dist': 1050
  },
  inactive: true
}, {
  cells: [[0, 1], [0, 0], [1, 0], [2, 0], [2, 1]],
  coords: {
    'angle': -127,
    'dist': 657
  },
  inactive: true
}, {
  cells: [[0, 0], [1, 0], [1, 1], [1, 2]],
  coords: {
    'angle': -117,
    'dist': 810
  },
  inactive: true
}, {
  cells: [[0, 0], [0, 1], [1, 1], [2, 1], [2, 0]],
  coords: {
    'angle': -119,
    'dist': 950
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': -107,
    'dist': 580
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': -106,
    'dist': 840
  },
  inactive: true
}, {
  cells: [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2]],
  coords: {
    'angle': -102,
    'dist': 700
  },
  inactive: true
}, {
  cells: [[0, 0], [1, 0], [1, 1], [1, 2]],
  coords: {
    'angle': -88,
    'dist': 510
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': -85,
    'dist': 700
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': -67,
    'dist': 560
  },
  inactive: true
}, {
  cells: [[0, 0], [1, 0], [1, 1], [2, 1]],
  coords: {
    'angle': -71,
    'dist': 734
  },
  inactive: true
}, {
  cells: [[0, 1], [1, 1], [2, 1], [2, 0]],
  coords: {
    'angle': -69,
    'dist': 880
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': -60,
    'dist': 836
  },
  inactive: true
}, {
  cells: [[1, 0], [0, 0], [0, 1], [0, 2], [1, 2]],
  coords: {
    'angle': -60,
    'dist': 650
  },
  inactive: true
}, {
  cells: [[0, 0], [1, 0], [2, 0]],
  coords: {
    'angle': -50,
    'dist': 790
  },
  inactive: true
}, {
  cells: [[0, 0], [0, 1], [0, 2]],
  coords: {
    'angle': -55,
    'dist': 980
  },
  inactive: true
}, {
  cells: [[0, 2], [0, 1], [1, 1], [2, 1], [2, 0]],
  coords: {
    'angle': -39,
    'dist': 830
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': -44,
    'dist': 970
  },
  inactive: true
}, {
  cells: [[0, 0], [0, 1], [1, 1], [1, 2]],
  coords: {
    'angle': -46,
    'dist': 1100
  },
  inactive: true
}, {
  cells: [[0, 0]],
  coords: {
    'angle': -40,
    'dist': 1170
  },
  inactive: true
}, {
  cells: [[0, 0], [1, 0], [1, 1], [1, 2]],
  coords: {
    'angle': -33,
    'dist': 1050
  },
  inactive: true
}];

var Tetris = {
  $: null,
  squareSize: 10,
  squareGap: 1,
  cubeSize: 12,
  fieldSize: 0,
  square: null,
  groupSymbols: {},
  groups: [],
  startInCube: false,
  defaultColor: '#00F260',
  animationTime: 1500,
  minifyTime: 2500,
  animationEasing: {
    'in': mina.easein,
    'minify': mina.easeout
  }
};

Tetris.init = function(config) {
  var selector = config.element || '#tetris';
  this.cubeSize = config.cubeSize || 12;

  this.fieldSize = Math.floor(this.cubeSize * (this.squareSize + this.squareGap) - this.squareGap);

  this.$ = Snap(selector).attr({
    width: this.fieldSize,
    height: this.fieldSize
  });

  var offset = Math.floor(this.fieldSize / - 2);
  this.$.node.style.marginLeft = offset + 'px';
  this.$.node.style.marginTop = offset + 'px';

  this.animationTime = config.animationTime || this.animationTime;
  this.minifyTime = config.minifyTime || this.minifyTime;
  this.defaultColor = config.defaultColor || this.defaultColor;
  this.startInCube = config.startInCube || false;

  this.square = this.createSquare();
  this.square.attr({id: 'square'})
  this.setGroups();
};

Tetris.createSquare = function() {
  var square = this.$.symbol();
  square.rect(0, 0, this.squareSize, this.squareSize);
  return square;
};

Tetris.countTransform = function(group, sizes, coords) {
  var transformData = group.coords;
  var transforms = {};

  var rotate = group.rotate || 0;
  var xRotate = (sizes.width * this.squareSize + (sizes.width - 1) * this.squareGap) / 2 + sizes.startX;
  var yRotate = (sizes.height * this.squareSize + (sizes.height - 1) * this.squareGap) / 2 + sizes.startY;

  var rotateTransform = 'rotate(' + rotate + ', ' + xRotate + ', ' + yRotate + ')';

  var angle = transformData.angle * Math.PI / 180;
  var xDiff = Math.cos(angle) * transformData.dist;
  var yDiff = Math.sin(angle) * transformData.dist * -1;
  xDiff = Math.floor(xDiff);
  yDiff = Math.floor(yDiff);
  var translateTransform = "translate(" + xDiff + ", " + yDiff + ")";
  transforms = translateTransform + ' ' + rotateTransform;
  
  return transforms;
};

Tetris.setGroups = function() {
  var len = tetrisGroups.length;
  for (var i = 0; i < len; i++) {
    var groupData = tetrisGroups[i];
    var cells = groupData.cells;
    var group = this.$.group();
    group.node.setAttribute('data-state', 'out');
    var sizes = { x: {}, y: {}, width: 0, height: 0, startX: null, startY: null };

    for (var j = 0; j < cells.length; j++) {
      var place = cells[j];
      var placeX = place[0];
      var placeY = place[1];

      if (sizes.x[placeX]) sizes.width++;
      else {
        sizes.x[placeX] = true;
        sizes.width = 1;
      }

      if (sizes.y[placeY]) sizes.height++;
      else {
        sizes.y[placeY] = true;
        sizes.height = 1;
      }

      var x = placeX * this.squareSize + placeX * this.squareGap;
      var y = placeY * this.squareSize + placeY * this.squareGap;

      sizes.startX = sizes.startX ? Math.min(sizes.startX, x) : x;
      sizes.startY = sizes.startY ? Math.min(sizes.startY, y) : y;

      var attrs = {
        x: x,
        y: y,
        'data-index-x': placeX,
        'data-index-y': placeY
      };
      group.add(
        this.$.use(this.square).attr(attrs)
      );
    }

    var transforms = this.countTransform(groupData, sizes);

    group.attr({
      'id': "group-" + i, 
      'class': 'tetris-group' + (groupData.inactive ? ' inactive' : ''), 
      'transform': transforms,
      'fill': groupData.fill || this.defaultColor,
    })

    if (groupData.inactive) {
      // group.attr({
      //   'fill': 'red'
      // });
      continue;
    }

    this.groups.push({
      $: group,
      transforms: transforms
    });
  }   
};

Tetris.start = function(callback, callbackDelay) {
  callbackDelay = callbackDelay || 500;
  var finished = [];
  var that = this;

  for (var i = 0, len = this.groups.length; i < len; i++) {
    var group = that.groups[i];
    group.$.animate( { 'transform': '' }, 
    that.animationTime, 
    that.animationEasing['in'],
    function() {
      finished.push(true);
      if (finished.length >= len) {
        that.$.animate(
          { 'opacity': 0 },
          that.minifyTime,
          that.animationEasing['minify'],
          callback
        )
      }
    }
    );
  }
};



var initTetris = function(tetrisConfig) {
  tetrisConfig = tetrisConfig || {};
  Tetris.init({
    element: tetrisConfig.element || '#tetris',
    animationTime: tetrisConfig.animationTime || 1000,
    minifyTime: tetrisConfig.minifyTime || 1500,
    defaultColor: tetrisConfig.defaultColor || '#00F260',
    startInCube: tetrisConfig.startInCube || false,
    squareSize: tetrisConfig.squareSize || 8
  });
};

var startTetris = function(callback) {
  var element = document.querySelector('.puzzle');
  element.setAttribute('data-cube', '');
  Tetris.start(function() {
    callback ? callback() : null;
    
    setTimeout(function() {
      element.removeAttribute('data-delay');
    }, 2800)
  }, 400);
};

initTetris({
  animationTime: 800,
  minifyTime: 400
});

return {
  start: startTetris
};

})();

