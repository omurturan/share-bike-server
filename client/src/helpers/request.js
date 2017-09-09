import axios from 'axios'

export default {
  create: function () {
    return new axios.create({
      baseURL: 'http://localhost:8081'
    })
  }
}
