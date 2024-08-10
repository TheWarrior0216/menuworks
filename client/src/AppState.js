import { reactive } from 'vue'
import { Restaurant } from './models/Restaurant.js'
import { Item } from './models/Item.js'
import { Order } from './models/Order.js'
import { OrderItem } from './models/OrderItem.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type Restaurant[] */
  restaurants: [],
  /** @type Restaurant */
  activeRestaurant: null,
  weekday: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  currentDay: "",
  /** @type Restaurant */
  spotlightRestaurant: null,
  /** @type Item[] */
  items: [],
  /** @type Item */
  activeItem: null,
  quantity: 1,
  /** @type Order */
  activeOrder: null,
  /** @type OrderItem[] */
  orderItems: [],
  idNum: 0,

  /** @type Order[] */
  orders: [],
  search: '',
  center: null,
  isPushed: false
})