export const getRemoveRuleData = (data, i) => {
    const newArray = []
    data.forEach((element, index, array) => {
      if (index !== i) {
        newArray.push(element)
      }
    })
    return newArray
  }