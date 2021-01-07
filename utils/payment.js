'use strict';
const axios = require('axios').default;

const instance = axios.create({
  baseURL: 'https://www.asaas.com/api/v3',
  timeout: 3000,
  headers: { 'access_token': '40cdb021a966d62c75bd89eee1559408771d8dd661aee91c38386002c5452b73' }
});

/**
 * `payment` service.
 */

module.exports = {
  createCustomer: async (payload) => {
    try {
      const { data } = await instance.post('/customers', payload);
      return data;
    } catch (error) {
      console.log('createCustomer ERROR: ', error)
      return false;
    }
  },
  createBilling: async (payload) => {
    try {
      const { data } = await instance.post('/payments', payload);
      return data;
    } catch (error) {
      console.log('createBilling ERROR: ', error)
      return false;
    }
  },
};
