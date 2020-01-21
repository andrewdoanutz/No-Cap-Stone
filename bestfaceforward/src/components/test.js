
const Matabase2 = require('../components/Matabase2')

// module.exports={
//   async function operation() {
//     return new Promise(function(resolve, reject) {
//       var a = 0;
//       var b = 1;
//       a = a + b;
//       a = 5;
//
//       // may be a heavy db call or http request?
//       resolve(a) // successfully fill promise
//     })
//   }
//
//   async function app() {
//     var a = await operation() // a is 5
//     console.log("a:",a)
//   }
// };
//

var id = Matabase2.addMeeting()
console.log(id)
