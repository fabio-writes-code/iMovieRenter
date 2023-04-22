import httpService from "./httpService";
// import config from '../config.json'



const apiEndpoint = 'rentals'

function getRentalUrl(id) {
  return `${apiEndpoint}/${id}`
}

export function getRentals() {
  return httpService.get(apiEndpoint)
}

export function getRental(id) {
  return httpService.get(getRentalUrl(id))
}

export function saveRental(rental) {
  //Update the customer
  if (rental._id) {
    //clone the customer object and delete Id
    const body = { ...rental }
    delete body._id
    console.log('body', body);
    httpService.put(getRentalUrl(rental._id), body)
    return
  }
  httpService.post(apiEndpoint, rental)
}


export function deleteRental(rentalId) {
  return httpService.delete(getRentalUrl(rentalId))
}