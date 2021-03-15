import { h, render } from 'preact'
import { App } from './app'

const start = async () => {
  render(<App />, document.body)
}

document.addEventListener('readystatechange', () => {
  const elem = (window.addEventListener) ? window : document
  elem.addEventListener('load', start, false)
})
