 const regularEmoji = function (text) {
   let result = []
   const regular = /(\/\{.+?\})/g
   const symbol = /(\n)/g
   text.split(symbol).map(v => {

     v.split(regular).map(v => {
       if (regular.test(v)) {
         result.push({
           image: v
         })
       } else {
         result.push({
           text: v
         })
       }
     })
   })
   return result
 }
 export default regularEmoji