import axios from 'axios'

export default {
  create: function () {
    // eslint-disable-next-line
    return new axios.create({
      baseURL: 'http://localhost:8081'
    })
  }
}
