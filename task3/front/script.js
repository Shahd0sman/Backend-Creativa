
const userbtn=document.getElementById('users')
const userdata=document.getElementById('user')
const adduser = document.getElementById('addusers');

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
adduser.addEventListener('click', async () => {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const createuser = {
        id: id,
        name: name,
        age: age
    };

    const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });
    const data = await response.json();
    console.log(data);
});