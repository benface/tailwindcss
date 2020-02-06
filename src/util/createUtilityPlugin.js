import fromPairs from 'lodash/fromPairs'
import toPairs from 'lodash/toPairs'
import castArray from 'lodash/castArray'

function className(classPrefix, key, options) {
  if (options.handleDefault && key === 'default') {
    return classPrefix
  }

  if (options.handleNegative && key.startsWith('-')) {
    return `-${classPrefix}${key}`
  }

  return `${classPrefix}-${key}`
}

export default function createUtilityPlugin(themeKey, utilityVariations, {
  handleDefault = true,
  handleNegative = true,
} = {}) {
  return function({ e, addUtilities, variants, theme }) {
    const utilities = utilityVariations.map(([classPrefix, properties]) => {
      return fromPairs(
        toPairs(theme(themeKey)).map(([key, value]) => {
          return [
            `.${e(className(classPrefix, key, { handleDefault, handleNegative }))}`,
            fromPairs(castArray(properties).map(property => [property, value])),
          ]
        })
      )
    })
    return addUtilities(utilities, variants(themeKey))
  }
}
