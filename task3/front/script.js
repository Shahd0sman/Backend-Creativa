
const userbtn=document.getElementById('users')
const userdata=document.getElementById('user')
const adduser = document.getElementById('addusers');
const successPopup = document.getElementById('success-popup');
const closePopup = document.getElementById('close-popup');
const popupStorageKey = 'user-added-popup';

function showSuccessPopup() {
    successPopup.classList.add('show');
    sessionStorage.setItem(popupStorageKey, 'show');
}

closePopup.addEventListener('click', () => {
    successPopup.classList.remove('show');
    sessionStorage.removeItem(popupStorageKey);
});

if (sessionStorage.getItem(popupStorageKey) === 'show') {
    showSuccessPopup();
}

userbtn.addEventListener('click',async()=>{
    const res=await fetch('http://localhost:5000/users')
    const users=await res.json();
    console.log(users)
    userdata.innerHTML='';
    users.forEach(user=>{
        userdata.innerHTML+=`
        <div>
            <h3>${user.name}</h3>
            <p>${user.age}</p>
        </div>`
        
    })
})

adduser.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('Add user button clicked');
    try {
        const id = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const createuser = {
            id: id,
            name: name,
            age: age
        };

        const res = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(createuser)
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            showSuccessPopup();
        } else {
            console.error('Could not add user:', data);
        }
    } catch (error) {
        console.error('Could not connect to the server:', error);
    }
});