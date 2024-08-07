import { AppState } from "../AppState.js"
import { Order } from "../models/Order.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class OrdersService {
    async getRestaurantOrders(id) {
        const response = await api.get(`api/restaurants/${id}/orders`)
        logger.log(response.data)
        const orders = response.data.map((data)=>new Order(data))
        AppState.orders = orders
    }

    async getPendingRestaurantOrders(orderId) {
        
    }

    async getAllOrders() {
        const response = await api.get('api/orders')
        logger.log('Getting all orders', response.data)
        const orders = response.data.map(orderData => new Order(orderData))
        AppState.orders = orders
    }

    async completedOrder(orderId) {
        const orderToEdit = AppState.orders.find(order => orderId == order.id)
        const response = await api.put(`api/orders/${orderId}`, { completed: true })
        orderToEdit.completed = true
        logger.log('Order complete!', response.data)

    }

    async submitOrder() {
        const orderData = AppState.activeOrder
        orderData.placed = true
        const order = await api.post('api/orders', orderData)
        const orderItems = AppState.orderItems
        await orderItems.forEach((item) => {
            item.orderId = order.data.id
            api.post('api/orderitems', (item))
        })
        AppState.orderItems = []
        logger.log('order posted')
    }

    createOrder(restaurantId) {
        const orderData = {
            _id: 1234567,
            accountId: AppState.account.id,
            restaurantId: restaurantId,
            placed: false,
            completed: false,
            createdAt: new Date()
        }
        const order = new Order(orderData)
        logger.log(order)
        AppState.activeOrder = order
    }

}
export const ordersService = new OrdersService()