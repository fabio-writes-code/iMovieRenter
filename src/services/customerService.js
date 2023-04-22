import httpService from "./httpService";
// import config from '../config.json'



const apiEndpoint = 'customer'

function getCustomerUrl(id) {
  return `${apiEndpoint}/${id}`
}

export function getCustomers() {
  return httpService.get(apiEndpoint)
}

export function getCustomer(id) {
  return httpService.get(getCustomerUrl(id))
}

export function saveCustomer(customer) {
  //Update the customer
  if (customer._id) {
    //clone the customer object and delete Id
    const body = { ...customer }
    delete body._id
    console.log('body', body);
    httpService.put(getCustomerUrl(customer._id), body)
    return
  }
  httpService.post(apiEndpoint, customer)
}


export function deleteCustomer(customerId) {
  return httpService.delete(getCustomerUrl(customerId))
}