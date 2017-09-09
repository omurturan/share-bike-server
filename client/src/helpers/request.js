import axios from 'axios'

export default {
  getInstance: function () {
    return new axios.create({
      baseURL: 'http://localhost:8081'
    })
  }
}
