import perCityAndState from "@/data/geoLocationPerCityAndState.json"


export function isValidLocationState(userLocation: string, latitude: number, longitude: number) {

  return (perCityAndState as Array<any>).some(item => userLocation === item.cityState.split(",")[1] && Math.round(item.latitude) === Math.round(latitude) && Math.round(item.longitude) === Math.round(longitude))

}
