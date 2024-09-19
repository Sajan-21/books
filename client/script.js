//add books to db
async function addBook(event) {

    event.preventDefault();

    let body = {
        name : document.getElementById('name').value,
        author : document.getElementById('author').value,
        image : document.getElementById('image').value,
        description : document.getElementById('description').value,
        category : document.getElementById('category').value,
        publish : document.getElementById('publish').value,
        release_date : document.getElementById('release_date').value,
        price : document.getElementById('price').value
    }

    let strBody = JSON.stringify(body);
    console.log("body : ",body);

    try {

        let response = await fetch('/book', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : strBody
        });

        if(response.statusCode = 200){
            alert("product added successfully");
        }else{
            alert("product addition failed");
        }
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}

//index page onload function
async function specialBooks() {

}

//get all books on shop.html page
async function getAllBooks() {

    try {

        let response = await fetch('/books');
        console.log("response : ",response,"  ",typeof(response));
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}