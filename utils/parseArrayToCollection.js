
module.exports = (array, treatObject) => {
  let returnCollection = []
  for(let object of array) {
    returnCollection.push(treatObject(object))
  }

  return returnCollection
}
