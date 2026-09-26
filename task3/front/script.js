console.log('script is working')
const userbtn = document.getElementById('users');
const userdata = document.getElementById('user');
const adduser = document.getElementById('addusers');
const successPopup = document.getElementById('success-popup');
const popupMessage = document.getElementById('popup-message');
const closePopup = document.getElementById('close-popup');
console.log(adduser)
userbtn.addEventListener('click', async () => {
    console.log('button clicked')
    const response = await fetch('http://localhost:5000/users');
    const users = await response.json();
    userdata.innerHTML = '';
    users.forEach(user => {
        userdata.innerHTML += `
            <div>
                <h3>${user.name}</h3>
                <p>${user.age}</p>
            </div>
        `;
    });
});
function showPopup(message) {
    popupMessage.textContent = message;
    successPopup.classList.add('show');
}
closePopup.addEventListener('click', () => {
    successPopup.classList.remove('show');
});
adduser.addEventListener('click', async (event) => {
    console.log('button clicked')
    event.preventDefault();

    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    const newUser = {
        id,
        name,
        age
    };
    console.log('sending new user',newUser)
    const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });
        console.log('response received');

    const data = await response.json();
    console.log(data);
    if (response.ok) {
        showPopup('User added successfully!');
    }
});
const productbtn = document.getElementById('products');
const productdata = document.getElementById('product'); // you'd need a container div for this too, similar to #user

productbtn.addEventListener('click', async () => {
    const response = await fetch('http://localhost:5000/products');
    const products = await response.json();
    productdata.innerHTML = '';
    products.forEach(product => {
        productdata.innerHTML += `
            <div>
                <h3>${product.name}</h3>
                <p>${product.stock}</p>
            </div>
        `;
    });
});
const addproduct = document.getElementById('addproducts');

addproduct.addEventListener('click', async (event) => {

    event.preventDefault();

    const id = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const stock = document.getElementById('product-stock').value;

    const newProduct = {
        id,
        name,
        stock
    };

    const response = await fetch('http://localhost:5000/products', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(newProduct)
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
        showPopup('Product added successfully!');
    }
});
