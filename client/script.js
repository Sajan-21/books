function addingForm() {

    document.getElementById('addForm').style.display = "block";

}

function exitForm() {

    document.getElementById('addForm').style.display = "none";

}

//add books to db
async function addBook(event) {

    event.preventDefault();

    try {

        let name = document.getElementById('name').value;
        console.log("name : ",name);
        let author = document.getElementById('author').value;
        console.log("author : ",author);
        let image = document.getElementById('image').value;
        console.log("image : ",image);
        let description = document.getElementById('description').value;
        console.log("description : ",description);
        let category = document.getElementById('category').value;
        console.log("category : ",category);
        let publish = document.getElementById('publish').value;
        console.log("publish : ",publish);
        let release_date = document.getElementById('release_date').value;
        console.log("release_date : ",release_date);
        let price = document.getElementById('price').value;
        console.log("price : ",price);

        let bookData = {
            name,
            author,
            image,
            description,
            category,
            publish,
            release_date,
            price
        }

        let strBook = JSON.stringify(bookData);

        let response = await fetch ('/book',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : strBook
        });

        if(response.statusCode = 200){
            alert("product added succesfully");

            window.location = `admin.html`;

        } else {
            alert("product adding failed");
        }
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}

// index page onload function
async function specialBooks() {

    try {

        let response = await fetch('/books');
        console.log("response : ",response,"  ",typeof(response));

        let parsedResponse = await response.json();
        console.log("parsedResponse : ",parsedResponse);

        let booksData = parsedResponse.data;
        console.log("booksData : ",booksData);

        let featuredRow = '';

        for(let i = 0; i < 4; i++){

            featuredRow = featuredRow +`
                <div class="d-flex flex-column justify-content-between gap-3 p-3 col" onclick="singleViewPage('${booksData[i]._id}')">
                    <div class="text-center"><img src="${booksData[i].image}" class="images-size"></div>
                    <div class="text-center text-danger fw-">${booksData[i].price}$</div>
                    <div class="text-center fs-5 text fw-bolder">${booksData[i].name}</div>
                    <div class="text-center text fw-">${booksData[i].author}</div>
                </div>
            `
            document.getElementById('featuredContainer').innerHTML = featuredRow;

        }

        let newRow = '';

        for(let i = 4; i < 8; i++){

            newRow = newRow +`
                <div class="d-flex flex-column justify-content-between gap-3 p-3 col" onclick="singleViewPage('${booksData[i]._id}')">
                    <div class="text-center"><img src="${booksData[i].image}" class="images-size"></div>
                    <div class="text-center text-danger fw-">${booksData[i].price}$</div>
                    <div class="text-center fs-5 text fw-bolder">${booksData[i].name}</div>
                    <div class="text-center text fw-">${booksData[i].author}</div>
                </div>
            `
            document.getElementById('newContainer').innerHTML = newRow;

        }

        let sellerRow = '';

        for(let i = 8; i < 12; i++){

            sellerRow = sellerRow +`
                <div class="d-flex flex-column justify-content-between gap-3 p-3 col" onclick="singleViewPage('${booksData[i]._id}')">
                    <div class="text-center"><img src="${booksData[i].image}" class="images-size"></div>
                    <div class="text-center text-danger fw-">${booksData[i].price}$</div>
                    <div class="text-center fs-5 text fw-bolder">${booksData[i].name}</div>
                    <div class="text-center text fw-">${booksData[i].author}</div>
                </div>
            `
            document.getElementById('sellerContainer').innerHTML = sellerRow;

        }


        
    } catch (error) {

        console.log("error : ",error);
        
    }

}

//all books in shop.html page
async function getAllBooks() {

    try {

        let response = await fetch('/books');
        console.log("response : ",response,"  ",typeof(response));

        let parsedResponse = await response.json();
        console.log("parsedResponse : ",parsedResponse);

        let booksData = parsedResponse.data;
        console.log("booksData : ",booksData);

        let row = '';

        for(let i = 0; i < booksData.length; i++){

            row = row +`
                <div class="d-flex flex-column justify-content-center gap-3 p-3 col" onclick="singleViewPage('${booksData[i]._id}')">
                    <div class="text-center"><img src="${booksData[i].image}" class="images-size"></div>
                    <div class="text-center text-danger fw-">${booksData[i].price}$</div>
                    <div class="text-center fs-5 text fw-bolder">${booksData[i].name}</div>
                    <div class="text-center text fw-">${booksData[i].author}</div>
                </div>
            `
            document.getElementById('dataContainer').innerHTML = row;

        }
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}

//fetch datas to admin.html page
async function mongoDb() {

    document.getElementById('addForm').style.display = "none";

    try {

        let response = await fetch('/books');
        console.log("response : ",response,"  ",typeof(response));

        let parsedResponse = await response.json();
        console.log("parsedResponse : ",parsedResponse);

        let booksData = parsedResponse.data;
        console.log("booksData : ",booksData);

        let dateArr = [];
        let date;

        let row = '';

        for(let i = 0; i < booksData.length; i++){

            dateArr = booksData[i].release_date.split(' ');
            date = dateArr[0].split('-');

            row =
              row +
              `
                <div class="d-flex flex-column text-start p-3 border border-success rounded bg-light">
                    <div class="d-flex gap-3 justify-content-end">
                        <button class="btn border border-primary rounded-pill" onclick="editPage('${booksData[i]._id}')">edit</button>
                        <button class="btn border border-danger rounded-pill" onclick="deleteBook('${booksData[i]._id}')">delete</button>
                    </div>
                    <div class="text-start">name : ${booksData[i].name}></div>
                    <div class="text-start">author : ${booksData[i].author}</div>
                    <div class="text-start">image url : ${booksData[i].image}</div>
                    <div class="text-start">description : ${booksData[i].description}</div>
                    <div class="text-start">category : ${booksData[i].category}</div>
                    <div class="text-start">published by : ${booksData[i].publish}></div>
                    <div class="text-start">release_date : ${date[2]} - ${date[1]} - ${date[0]}</div>
                    <div class="text-start">price : ${booksData[i].price}</div>
                </div>
            `;
            document.getElementById('mongoContainer').innerHTML = row;

        }
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}

//go to singleViewPage.html page
function singleViewPage(id) {

    window.location = `singleView.html?id=${id}`;

}

//get singleBook datas
async function getBook() {

    try {

        let queryString = window.location.search;
        console.log("queryString : ",queryString);

        let url_params = new URLSearchParams(queryString);
        console.log("url_params : ",url_params);

        let id = url_params.get('id');
        console.log("id : ",id);

        let response = await fetch(`/book/${id}`)
        console.log("response : ",response);

        let parsedResponse = await response.json();
        console.log("parsedResponse : ",parsedResponse);

        let bookData = parsedResponse.data;
        console.log("bookData : ",bookData);

        let dateArr = [];
        dateArr = bookData.release_date.split(' ');
        console.log("dateArr : ",dateArr);

        let date = dateArr[0].split('-');
        console.log("date : ",date);

        let row = `
                <div class="">
                    <div class="row text-center">
                        <div><p class="fs-1 fw-bolder text-success">${bookData.name}</p></div>
                    </div>
                    <div class="row p-5 d-flex align-items-center">
                        <div class="col text-end p-3 border-end border-success">
                            <img src="${bookData.image}" alt="">
                        </div>
                        <div class="col p-3">
                            <div class=" text-secondary fs-6">by<p class="text-dark fs-5">${bookData.author}</p></div>
                            <div class=" text-secondary fs-6">category<p class="text-dark fs-5">${bookData.category}</p></div>
                            <div class=" text-secondary fs-6">published by<p class="text-dark fs-5">${bookData.publish}</p></div>
                            <div class=" text-secondary fs-6">release date<p class="text-dark fs-5">${bookData.release_date}</p></div>
                            <div class=" text-secondary fs-6"><p class="text-danger fs-5">${bookData.price}$</p></div>
                        </div>
                    </div>
                    <div class="text-secondary fs-6">
                        <p class="text-center">description</p>
                        <p class="text-dark fs-5">${bookData.description}</p>
                    </div>
                    <div class="d-flex gap-3 justify-content-center">
                        <button class="rounded-pill px-3 py-2 bg-success text-light border-0">Buy Now</button>
                        <button class="rounded-pill px-3 py-2 bg-warning text-dark border-0">add to Cart</button>
                    </div>
                </div>
        `;

        document.getElementById('bookContainer').innerHTML = row;
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}

//go to updation.html page
function editPage(id) {

    window.location.href = `updation.html?id=${id}`;

}

//updatePage onload values
async function typeFilling() {

    try {

        let queryString = window.location.search;
        console.log("queryString : ",queryString);

        let url_params = new URLSearchParams(queryString);
        console.log("url_params : ",url_params);

        let id = url_params.get('id');
        console.log("id : ",id);

        let response = await fetch(`/book/${id}`)
        console.log("response : ",response);

        let parsedResponse = await response.json();
        console.log("parsedResponse : ",parsedResponse);

        let bookData = parsedResponse.data;
        console.log("bookData : ",bookData);

        let name = document.getElementById('name');
        name.value = bookData.name;
        let author = document.getElementById('author');
        author.value = bookData.author;
        let image = document.getElementById('image');
        image.value = bookData.image;
        let description = document.getElementById('description');
        description.value = bookData.description;
        let category = document.getElementById('category');
        category.value = bookData.category;
        let publish = document.getElementById('publish');
        publish.value = bookData.publish;
        let release_date = document.getElementById('release_date');
        release_date.value = bookData.release_date;
        let price = document.getElementById('price');
        price.value = bookData.price;
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}

//updating datas of book
async function updateBook(event) {

    event.preventDefault();

    try {

        let queryString = window.location.search;
        console.log("queryString : ",queryString);

        let url_params = new URLSearchParams(queryString);
        console.log("url_params : ",url_params);

        let id = url_params.get('id');
        console.log("id : ",id);

        let name = document.getElementById('name').value;
        let author = document.getElementById('author').value;
        let image = document.getElementById('image').value;
        let description = document.getElementById('description').value;
        let category = document.getElementById('category').value;
        let publish = document.getElementById('publish').value;
        let release_date = document.getElementById('release_date').value;
        let price = document.getElementById('price').value;

        let updatedBook = {
            name,
            author,
            image,
            description,
            category,
            publish,
            release_date,
            price
        }

        let strUpdatedBook = JSON.stringify(updatedBook);
        console.log("strUpdatedBook : ",strUpdatedBook);

        let putResponse = await fetch(`/book/${id}`,{
            method : 'PUT',
            headers : {
                'Content-Type' : "application/json"
            },
            body : strUpdatedBook
        });

        console.log("putResponse : ",putResponse);
        if(putResponse.status === 200){
            alert("book datas updated successfully...");

            window.location = `admin.html`;
        } else {
            alert("book data updation failed...");
        }
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}

//deleteBook
async function deleteBook(id) {

    try {

        let deleteResponse = await fetch(`/book/${id}`,{method : 'DELETE'});

        if(deleteResponse.status === 200){
            alert("book deleted successfully...");
            window.location = `admin.html`;
        }else {
            alert("book deletion failed...");
        }
        
    } catch (error) {

        console.log("error : ",error);
        
    }

}