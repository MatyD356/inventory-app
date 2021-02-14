#! /usr/bin/env node

console.log('This script populates some test guitars, producers, categorie to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async')
var Guitar = require('./models/Guitar')
var Producer = require('./models/Producer')
var Category = require('./models/Category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var guitars = []
var producers = []
var categories = []

function guitarCreate(name, desc, price, inStock, category, producer, cb) {
  guitardetail = { name, desc, price, inStock, category, producer }

  var guitar = new Guitar(guitardetail);

  guitar.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New guitar: ' + guitar);
    guitars.push(guitar)
    cb(null, guitar)
  });
}

function categoryCreate(name, desc, cb) {
  var category = new Category({ name, desc });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  });
}

function producerCreate(name, desc, cb) {
  producerdetail = {
    name,
    desc,
  }

  var producer = new Producer(producerdetail);
  producer.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Producer: ' + producer);
    producers.push(producer)
    cb(null, producer)
  });
}



function createProducersCategories(cb) {
  async.series([
    function (callback) {
      producerCreate('Fender', 'Fender is an American manufacturer of stringed instruments and amplifiers. Fender produces acoustic guitars, bass amplifiers and public address equipment, but is best known for its solid-body electric guitars and bass guitars, particularly the Stratocaster, Telecaster, Jazzmaster, Precision Bass, and the Jazz Bass. The company was founded in Fullerton, California by Clarence Leonidas "Leo" Fender in 1946.[6] Its headquarters are in Los Angeles, California.', callback);
    },
    function (callback) {
      producerCreate('Gibson', 'Gibson is an American manufacturer of guitars, other musical instruments, and professional audio equipment from Kalamazoo, Michigan, and now based in Nashville, Tennessee. The company was formerly known as Gibson Guitar Corporation and renamed Gibson Brands, Inc. on June 11, 2013.', callback);
    },
    function (callback) {
      producerCreate('Yamaha', 'Yamaha is a Japanese multinational corporation and conglomerate with a very wide range of products and services. It is one of the constituents of Nikkei 225 and is the world\'s largest piano manufacturing company. The former motorcycle division was established in 1955 as Yamaha Motor Co., Ltd., which started as an affiliated company but later became independent, although Yamaha Corporation is still a major shareholder.', callback);
    },
    function (callback) {
      producerCreate('Epiphone', 'is an American musical instrument brand. It traces its roots to a musical instrument manufacturing business founded in 1873 by Anastasios Stathopoulos in Smyrna, Ottoman Empire and moved New York City in 1908', callback);
    },
    function (callback) {
      categoryCreate("Electric Guitars", `Electric Guitar is a guitar that requires external amplification in order to be heard at typical performance volumes. It uses one or more pickups to convert the vibration of its strings into electrical signals, which ultimately are reproduced as sound by loudspeakers. The sound can be shaped or electronically altered to achieve different timbres or tonal qualities, making it quite different from an acoustic guitar. Often, this is done through the use of effects such as reverb, distortion and "overdrive"; the latter is considered to be a key element of electric blues guitar music and rock guitar playing.`, callback);
    },
    function (callback) {
      categoryCreate("Bass Guitars", `The bass guitar, electric bass or simply bass, is the lowest-pitched member of the guitar family. It is a plucked string instrument similar in appearance and construction to an electric or an acoustic guitar, but with a longer neck and scale length, and typically four to six strings or courses. Since the mid-1950s, the bass guitar has largely replaced the double bass in popular music.`, callback);
    },
    function (callback) {
      categoryCreate("Acoustic Guitars", `An acoustic guitar is a musical instrument in the guitar family. Its strings vibrate a sound board on a resonant body to project a sound wave through the air. The original, general term for this stringed instrument is guitar, and the retronym 'acoustic guitar' distinguishes it from an electric guitar, which relies on electronic amplification. Typically, a guitar's body is a sound box, of which the top side serves as a sound board that enhances the vibration sounds of the strings. In standard tuning the guitar's six strings are tuned (low to high) E2 A2 D3 G3 B3 E4.`, callback);
    },
  ],
    // optional callback
    cb);
}


function createGuitars(cb) {
  async.parallel([
    function (callback) {
      guitarCreate('Fender CP-60S Parlor', `The Classic Design series CP-60S acoustic guitar's parlor body style ensures a comfortable playing experience, thanks to its smaller size. It also sings with a distinctly warm and intimate voice traditionally embraced by folk and blues players, making this model an ideal choice for the up-and-coming fingerstyle player.The Classic Design series CP-60S acoustic guitar's parlor body style ensures a comfortable playing experience, thanks to its smaller size. It also sings with a distinctly warm and intimate voice traditionally embraced by folk and blues players, making this model an ideal choice for the up-and-coming fingerstyle player.`, 219.99, 5, categories[0], producers[2], callback)
    },
    function (callback) {
      guitarCreate('Gibson 1952 J-185', 'The Gibson J-185 was originally released in 1951 and remains one of the most legendary Gibsons of all time. Crafted to be just slightly smaller in size to its larger cousin, the SJ-200, the Gibson J-185 used similar appointments, including Sitka spruce and maple back and sides for its construction.', 4999, 1, categories[2], producers[1], callback)
    },
    function (callback) {
      guitarCreate('Yamaha FS800 Folk', `The FS800 Folk is Yamaha's standard acoustic model, with simple and traditional looks and outstanding quality, at an affordable price. A solid-top guitar with authentic sound that is well-balanced without sacrificing its robust strength, thanks to the newly developed scalloped bracing design.`, 199.99, 10, categories[2], producers[2], callback)
    },
    function (callback) {
      guitarCreate('Epiphone Les Paul Special-I', `This is a limited-edition version of Epiphone's number-one-selling model is now available with a choice of "worn" finishes. The Epiphone Les Paul Special-I limited-edition electric guitar is a great way for beginners to get started on guitar with real Les Paul tone and feel`, 129.99, 3, categories[0], producers[3], callback)
    },
    function (callback) {
      guitarCreate('Gibson Les Paul Studio', `The Les Paul Studio embodies the essential Les Paul features with enhancements for playability and tonal versatility. The rosewood fingerboard and slim taper mahogany neck provide effortless playability and comfort.`, 1499, 0, categories[0], producers[1], callback)
    },
    function (callback) {
      guitarCreate('Fender Player Stratocaster', `Over the decades, players have been continually inspired by the sound of a Strat. From the clarity of the high end, through the gut punch of the mids and the solid lows, it's a sound that's helped define what an electric guitar should be—versatile enough for any style and broad enough for any player to find an individual voice.`, 749.99, 3, categories[0], producers[0], callback)
    },
    function (callback) {
      guitarCreate('Fender Special Edition Deluxe PJ', `We've teamed up with Fender to bring you another great-sounding, unique one-off bass loaded with premium features. The exclusive Deluxe PJ Bass has a Precision Bass body with the neck of a '70s Jazz Bass.`, 799.99, 2, categories[1], producers[0], callback)
    },
    function (callback) {
      guitarCreate('Yamaha TRBX174EW', `The TRBX174EW represents a price breakthrough for the TRBX range with exotic mango wood.You're the bedrock of your music. You need an instrument with the strength and power to perform.`, 249.99, 1, categories[1], producers[2], callback)
    },
    function (callback) {
      guitarCreate('Gibson Les Paul Junior Tribute DC Bass', `The Les Paul Junior Tribute DC Bass is a tribute to the historic Gibson EB-0 bass from the late '50s, but with modern features. Not just for smaller players, the short scale length is actually chosen by many for its strong fundamental tone and sits perfectly in a track when recording.`, 999, 1, categories[1], producers[1], callback)
    },
  ],
    // optional callback
    cb);
}

async.series([
  createProducersCategories,
  createGuitars,
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log('Guitars: ' + guitars);

    }
    // All done, disconnect from database
    mongoose.connection.close();
  });



