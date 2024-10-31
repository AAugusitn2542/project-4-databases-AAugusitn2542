// const handleSubmit = async (event) => {
    document.addEventListener('DOMContentLoaded', () => {
    
        const form = document.querySelector('form');
        console.log(form);
        form.addEventListener('submit', function(event) {
        console.log("submit form");
       // function handleSubmit(event) {
        
            event.preventDefault(); // prevent the default form behaviour 
    
        // Extract fields from the form, and
        // send a request to create a new restaurant
        //const id = document.getElementById('id').value
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const photo = document.getElementById('photo').value;
    
        fetch('/api/restaurants' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                     name, phone, address, photo
                    }),
        })
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            window.location.href = `/restaurants/${data.id}`;
        }).catch(error => {
            console.error('Error:', error);
        })   
        // Add event listener to the form for submit events
        })
    });
     







