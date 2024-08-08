import { AppState } from "../AppState.js"
import { maps } from "./AxiosService.js"

class MapsService {
    async getCoordinates(location) {
        const response = await maps.get(`/geocode/json?address=${location.replace(' ', '+')}&key=AIzaSyDq46WiXwnl9UoaNDabGfEvFnXrc7ZoXEI`)
        AppState.center = response.data.results[0]?.geometry.location
    }
}
export const mapsService = new MapsService()