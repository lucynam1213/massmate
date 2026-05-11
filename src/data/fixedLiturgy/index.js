/**
 * Fixed Liturgy — Index
 *
 * Assembles all fixed (Ordinary) Mass texts from the four section files.
 * Import from this file rather than the individual section files.
 *
 * To replace mock text with official licensed text, update the english/korean
 * fields in the relevant section file and change sourceStatus to 'licensed'.
 */

import { FIXED_INTRODUCTORY_RITES }      from './introductoryRites'
import { FIXED_LITURGY_OF_THE_WORD }     from './liturgyOfTheWord'
import { FIXED_LITURGY_OF_THE_EUCHARIST} from './liturgyOfTheEucharist'
import { FIXED_CONCLUDING_RITES }        from './concludingRites'

export const ALL_FIXED_TEXTS = [
  ...FIXED_INTRODUCTORY_RITES,
  ...FIXED_LITURGY_OF_THE_WORD,
  ...FIXED_LITURGY_OF_THE_EUCHARIST,
  ...FIXED_CONCLUDING_RITES,
]

export {
  FIXED_INTRODUCTORY_RITES,
  FIXED_LITURGY_OF_THE_WORD,
  FIXED_LITURGY_OF_THE_EUCHARIST,
  FIXED_CONCLUDING_RITES,
}
