let products = [
  { name: 'carrots', count: 1, deleted: true },
  { name: 'spinach', count: 2, deleted: false },
  { name: 'cookies', count: 1, deleted: false },
  { name: 'lettuce', count: 3, deleted: true },
  { name: 'avocado', count: 1, deleted: false },
]

// <ul> container
let product_list = document.getElementById('products-list')
// submit button
let submit_btn = document.getElementById('submit-btn')
let update_btn = document.getElementById('update-btn')
let product_input = document.getElementById('product-input')
let clear = document.getElementById('clear')
let alert = document.querySelector('.alert')
let deleted_checkbox = document.getElementById('deleted')
let numOfItem = document.getElementById('product-count')
let numOfProducts = document.getElementById('numberOfProduct')

deleted_checkbox.addEventListener('change', (e) => {
  let checked = e.target.checked

  console.log('checked:', checked)

  render_products(checked)
})

function display_alert_red(text) {
  alert.classList.add('red')
  alert.innerText = text
  alert.style.visibility = 'visible'

  setTimeout(() => {
    alert.classList.remove('red')
    alert.style.visibility = 'hidden'
  }, 5000)
}

function display_alert_green(text) {
  alert.classList.add('green')
  alert.innerText = text
  alert.style.visibility = 'visible'

  setTimeout(() => {
    alert.classList.remove('green')
    alert.style.visibility = 'hidden'
  }, 5000)
}

submit_btn.addEventListener('click', () => {
  let input_value = product_input.value.trim().toLowerCase()
  let count_value = numOfItem.value.trim()
  numOfProducts.innerText = products.length - 1
  if (input_value === '') {
    display_alert_red('Please enter product name')
  } else {
    let existingProduct = products.find(
      (product) => product.name === input_value
    )

    if (existingProduct) {
      display_alert_green('Product updated')
      existingProduct.count++
    } else {
      display_alert_green('Product added')

      let new_product = {
        name: input_value,
        count: count_value,
        deleted: false,
      }
      products.unshift(new_product)
    }

    render_products()
    product_input.value = ''
    numOfItem.value = ''
  }
})

clear.addEventListener('click', () => {
  products.forEach((product) => {
    product.deleted = true
  })

  render_products()
})

render_products()

document.body.addEventListener('click', (event) => {
  if (event.target.className.includes('delete-product')) {
    // get product index
    let product_index = event.target.parentElement.dataset.productIndex

    console.log('product_index:', product_index)

    // splice to remove
    // products.splice(product_index, 1);
    let filtered_products = products.filter((product) => !product.deleted)
    filtered_products[product_index].deleted = true

    render_products()
  } else if (event.target.className.includes('edit-product')) {
    // 1. get product index
    let product_index = event.target.parentElement.dataset.productIndex

    // 2. update product input value with selected product's name
    let selected_product = products[product_index]
    product_input.value = selected_product.name

    // 3. remove submit button, show update button
    submit_btn.style.display = 'none'
    update_btn.style.display = 'block'

    // 4. when update button is clicked, update object/products

    update_btn.addEventListener('click', () => {
      let input_value = product_input.value.trim().toLowerCase()

      if (input_value === '') {
        alert('Please, enter product name!')
      } else {
        selected_product.name = product_input.value.trim().toLowerCase()
        product_input.value = ''
        render_products()
      }
    })
  }
})

function render_products(filtered = false) {
  console.log('filtered:', filtered)
  console.log('products:', products)

  // renrer the products list
  product_list.innerHTML = ''

  // hide clear products if products is empty
  if (products.some((product) => product.deleted === filtered)) {
    clear.style.display = 'block'
  } else {
    clear.style.display = 'none'
  }

  products
    .filter((product) => product.deleted === filtered)
    .forEach((product, index) => {
      // product is a separate item. example:
      // { name: "carrots", count: 1 }

      // create a new element <li>
      if (product.count > 0) {
        // create a new <li> element
        let product_node = document.createElement('li')
        product_node.setAttribute('data-product-index', index)

        product_node.innerHTML = `<a>${product.name} x ${product.count}</a>`
        // append to the <ul> container
        product_list.appendChild(product_node)

        // create delete icon
        let delete_node = document.createElement('i')
        delete_node.setAttribute(
          'class',
          'fa-solid fa-trash-can delete-product'
        )
        product_node.appendChild(delete_node)

        // create edit icon
        let edit_node = document.createElement('i')
        edit_node.setAttribute(
          'class',
          'fa-solid fa-pen-to-square edit-product'
        )
        product_node.appendChild(edit_node)
      }
    })
}

// products.forEach((product, index) => { }
//        [same as]
// for (let index = 0; index < products.length; index++) {
//   const product = products[index];
// }
