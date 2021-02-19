import { LCDClient } from '@terra-money/terra.js'

export default function ({ store, redirect }) {
  const terra = new LCDClient({
    URL: 'https://soju-lcd.terra.dev',
    chainID: 'soju-0014',
  })
  return terra
}
