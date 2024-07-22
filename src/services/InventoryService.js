import axios from "axios";

// const cors = require('cors')
// const corsOptions = {
//     origin: 'http://localhost:8081',
//     credentials: true,
//     optionSuccessStatus: 200
// }
// app.use(cors(corsOptions))

const BASE_URL = 'http://localhost:8081/api-inventory/'
const ADD_PRODUCT_URL = BASE_URL + 'add-product'

export const addProduct = (product) => axios.post(ADD_PRODUCT_URL, product)