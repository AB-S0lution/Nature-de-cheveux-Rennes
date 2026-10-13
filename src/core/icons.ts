// Icônes Phosphor (famille unique, graisse light = trait fin).
import phone from '@phosphor-icons/core/assets/light/phone-light.svg?raw'
import arrowRight from '@phosphor-icons/core/assets/light/arrow-right-light.svg?raw'
import arrowLeft from '@phosphor-icons/core/assets/light/arrow-left-light.svg?raw'
import arrowUpRight from '@phosphor-icons/core/assets/light/arrow-up-right-light.svg?raw'
import mapPin from '@phosphor-icons/core/assets/light/map-pin-light.svg?raw'
import clock from '@phosphor-icons/core/assets/light/clock-light.svg?raw'
import leaf from '@phosphor-icons/core/assets/light/leaf-light.svg?raw'
import drop from '@phosphor-icons/core/assets/light/drop-light.svg?raw'
import scissors from '@phosphor-icons/core/assets/light/scissors-light.svg?raw'
import heart from '@phosphor-icons/core/assets/light/heart-light.svg?raw'
import list from '@phosphor-icons/core/assets/light/list-light.svg?raw'
import x from '@phosphor-icons/core/assets/light/x-light.svg?raw'
import sun from '@phosphor-icons/core/assets/light/sun-light.svg?raw'
import moon from '@phosphor-icons/core/assets/light/moon-light.svg?raw'
import plus from '@phosphor-icons/core/assets/light/plus-light.svg?raw'
import minus from '@phosphor-icons/core/assets/light/minus-light.svg?raw'
import search from '@phosphor-icons/core/assets/light/magnifying-glass-light.svg?raw'
import instagram from '@phosphor-icons/core/assets/light/instagram-logo-light.svg?raw'
import check from '@phosphor-icons/core/assets/light/check-light.svg?raw'
import play from '@phosphor-icons/core/assets/light/play-light.svg?raw'
import pause from '@phosphor-icons/core/assets/light/pause-light.svg?raw'
import bus from '@phosphor-icons/core/assets/light/bus-light.svg?raw'
import train from '@phosphor-icons/core/assets/light/train-light.svg?raw'
import car from '@phosphor-icons/core/assets/light/car-light.svg?raw'
import bicycle from '@phosphor-icons/core/assets/light/bicycle-light.svg?raw'
import wheelchair from '@phosphor-icons/core/assets/light/wheelchair-light.svg?raw'
import recycle from '@phosphor-icons/core/assets/light/recycle-light.svg?raw'
import lightning from '@phosphor-icons/core/assets/light/lightning-light.svg?raw'
import coffee from '@phosphor-icons/core/assets/light/coffee-light.svg?raw'
import handHeart from '@phosphor-icons/core/assets/light/hand-heart-light.svg?raw'
import sparkle from '@phosphor-icons/core/assets/light/sparkle-light.svg?raw'
import plant from '@phosphor-icons/core/assets/light/plant-light.svg?raw'
import flask from '@phosphor-icons/core/assets/light/flask-light.svg?raw'
import star from '@phosphor-icons/core/assets/light/star-light.svg?raw'
import quotes from '@phosphor-icons/core/assets/light/quotes-light.svg?raw'
import calendar from '@phosphor-icons/core/assets/light/calendar-light.svg?raw'
import sealCheck from '@phosphor-icons/core/assets/light/seal-check-light.svg?raw'
import copy from '@phosphor-icons/core/assets/light/copy-light.svg?raw'
import printer from '@phosphor-icons/core/assets/light/printer-light.svg?raw'
import storefront from '@phosphor-icons/core/assets/light/storefront-light.svg?raw'
import flower from '@phosphor-icons/core/assets/light/flower-light.svg?raw'
import wind from '@phosphor-icons/core/assets/light/wind-light.svg?raw'
import caretDown from '@phosphor-icons/core/assets/light/caret-down-light.svg?raw'

const raw = { phone, arrowRight, arrowLeft, arrowUpRight, mapPin, clock, leaf, drop, scissors, heart, list, x, sun, moon, plus, minus, search, instagram, check, play, pause, bus, train, car, bicycle, wheelchair, recycle, lightning, coffee, handHeart, sparkle, plant, flask, star, quotes, calendar, sealCheck, copy, printer, storefront, flower, wind, caretDown }

export type IconName = keyof typeof raw

/** Renvoie le SVG inline décoratif (aria-hidden), prêt à insérer. */
export function icon(name: IconName, size = 20): string {
  return raw[name].replace('<svg', `<svg class="ico" width="${size}" height="${size}" aria-hidden="true" focusable="false"`)
}
