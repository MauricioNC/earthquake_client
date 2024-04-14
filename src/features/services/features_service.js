import axios from 'axios'

export async function getFeatures(options) {
  try {
    const { page, per_page, magType } = options
    const response = await axios.get(`http://localhost:3000/api/v1/features?page=${page}&per_page=${per_page}&mag_type=${magType}`)
    return response.data
  }
  catch (err) {
    console.log(err)
  }
}

export async function createComment(options) {
  const headers = { 'Content-type': 'application/json' }

  try {
    const { url, featureId, body, method } = options
    axios({
      method: method,
      url: `${url}/api/v1/features/${featureId}/comments`,
      data: { body: body },
      headers
    })
    .then((response) => {
      if (response.status === 201) {
        const $comment = document.querySelector('.comment')
        const $successMessage = document.createElement('p')
        
        $successMessage.textContent = response.data.message
        $successMessage.classList.add('successComment')
        $comment.prepend($successMessage)

        setTimeout(() => {
          $successMessage.remove()
        }, 5000);
      }
    })
  }
  catch (err) {
    console.log(err)
  }
}