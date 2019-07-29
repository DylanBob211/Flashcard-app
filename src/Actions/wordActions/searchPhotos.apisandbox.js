const axios = require('axios').default;

axios.post('http://localhost:7000/api/unsplash', 'ciao')
  .then(res => console.log(res))
  .catch(e => console.log(e));
