const prefix = 'counter/'
export const increment = () => {
  return {
    type: `${prefix}INCREMENT`
  }
}
