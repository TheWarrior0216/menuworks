import { AppState } from "../AppState.js"
import { Order } from "../models/Order.js"
import { Restaurant } from "../models/Restaurant.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { orderItemsService } from "./OrderItemsService.js"

class OrdersService {
    async cancelOrder(orderId) {
        const response = await api.delete(`api/orders/${orderId}`)
        logger.log('Cancelling order', response.data)
        const orderIndex = AppState.orders.findIndex(order => order.id == orderId)
        if (orderIndex == -1) throw new Error("Unable to find orderIndex")
        AppState.orders.splice(orderIndex, 1)
    }
    async getRestaurantOrders(id) {
        const response = await api.get(`api/restaurants/${id}/orders`)
        logger.log(response.data)
        const orders = response.data.map((data) => new Order(data))
        AppState.orders = orders
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
        const promises = []
        orderItems.forEach((item) => {
            item.orderId = order.data.id
            promises.push(api.post('api/orderitems', (item)))
        })
        try {
            await Promise.all(promises)
        }
        catch (error) {
            const newOrder = await this.getOrderById(order.data.id)
            api.delete(`api/orders/${newOrder.id}/delete`)
            throw new Error(error.message)
        }

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

    async getOrderById(id){
        const response = await api.get(`api/orders/${id}`)
        const restaurant = new Order(response.data)
        return(restaurant)
    }

}
export const ordersService = new OrdersService()