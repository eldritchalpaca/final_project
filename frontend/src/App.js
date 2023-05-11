import { useState, useEffect } from "react";
import './App.css';
import itemsAll from "./mushrooms.json";

function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [viewer2, setViewer2] = useState(false);
  const [viewer4, setViewer4] = useState(false);
  const [oneProduct, setOneProduct] = useState([]);
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);
  const [searchString, setSearchString] = useState('');
  // const [ProductsCategory, setProductsCategory] = useState(itemsAll);
  // const [query, setQuery] = useState('');
  
  //page index names 
  //ex: do setPageIndex(home) to go to home page, changed for better navbar-ing
  //do pageIndex === home to check if you are in the home page
  const home = 0;
  const catalog = 1;
  const credits = 2;
  const itemList = 3;
  const [pageIndex, setPageIndex] = useState(home);

  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
    setViewer1(!viewer1);
  }

  const showAllItems = product.map((el) => (
    <div class="lesser-title-alt" key={el._id}>
      <img src={el.image} width={200} height={200} class="item-img frame"/> <br />
      Name: {el.name} <br />
      Id: {el._id} <br />
      Description: {el.description} <br />
      Price: ${el.price} <br />
      Location: {el.location.join(", ")} <br />
      Image Source: {el.imgSource} <br />
    </div>
  ));

  // new Product
  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    name: "",
    image: "http://127.0.0.1:4000/images/",
    location: "",
    description: "",
    price: 0.0,
    imgSource: "",
  });

  const [updateProduct, setUpdateProduct] = useState({
    _id: 0,
    price: 0.0,
  });

  function handleUpdateChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setUpdateProduct({ ...updateProduct, _id: value });
    } else if (evt.target.name === "price") {
      setUpdateProduct({ ...updateProduct, price: value });
    }
  }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } 
    else if (evt.target.name === "name") {
      setAddNewProduct({ ...addNewProduct, name: value });
    }
    else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    }
    else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value})
    } 
    else if (evt.target.name === "imgSource") {
      setAddNewProduct({ ...addNewProduct, imgSource: value });
    } 
    else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } 
    else if (evt.target.name === "location") {
      setAddNewProduct({ ...addNewProduct, rating: { location: value } });
    } 
/*     else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    } */
  }


  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function updateOneProduct(e) {
    e.preventDefault();
    //console.log(e.target.value);
    fetch("http://localhost:4000/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  function getAllProductsJSON(e) { //fetch is GET by default?
    e.preventDefault();
    //console.log(e.target.value);
    fetch("http://localhost:4000", {
      method: "GET",
    }) 
      .then((response) => response.json())
      .then((data) => {
        console.log("get product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          console.log(value);
        }
      });
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
    if (viewer1) {
      getAllProducts();
      getAllProducts();
    }
    getOneByOneProductNext();
  }

  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
        });
      setViewer2(!viewer2);
    } else {
      console.log("Wrong number of Product id.");
      setViewer2(false);
    }
  }

  const showOneItem = oneProduct.map((el) => (
    <div class="lesser-title-alt" key={el._id}><center>
      <img class="item-img frame" src={el.image} width={30} /> <br />
      Name: {el.name} <br />
      Id: {el._id} <br />
      Description: {el.description} <br />
      Price: ${el.price} <br />
      Location: {el.location.join(", ")} <br />
      Image Source: {el.imgSource} <br />
      </center>
    </div>
  ));


function changePage(page) {
  setPageIndex(page);
}

function changePage(page, str) {
  setPageIndex(page);
  setSearchString(str);
}

function SearchResults() {
  
  /* JSON VERSION */
  const filteredData = itemsAll.filter((item) =>
    item.name.toLowerCase().includes(searchString.toLowerCase())
  );

  /* DATABASE VERSION
  fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
  */

  /* NOTE: WOULD BE product.map FOR DATABASE */
  const items = filteredData.map((item) => (
    <div className="lesser-title-alt" key={item._id}>
      <img src={item.image} width={200} height={200} className="item-img frame"/> <br />
      Name: {item.name} <br />
      Id: {item._id} <br />
      Description: {item.description} <br />
      Price: ${item.price} <br />
      Location: {item.location.join(", ")} <br />
      Image Source: {item.imgSource} <br />
    </div>
  ));

  return <div>{items}</div>;
}

  function handleSearchInputChange(event) {
    setSearchString(event.target.value);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    changePage(itemList, searchString);
  }

  useEffect(() => {
    console.log("bep" + searchString);
  }, [searchString]);

  return (
    <div>
      {/* navbar */}
      <nav class="navbar navbar-expand-lg bg-body-tertiary lesser-title-alt">
        <div class="container-fluid">
          {/* <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button> */}
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" /* href="#" */ onClick={() => changePage(home)}>Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" /* href="#" */ onClick={() => changePage(catalog)}>Catalog</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" /* href="#" */ onClick={() => changePage(credits)}>Credits</a>
              </li>
              {/* <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Browse Categories
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Mushrooms</a></li>
                  <li><a class="dropdown-item" href="#">Plants</a></li>
                  <li><a class="dropdown-item" href="#">Animals</a></li>
                </ul>
              </li> */}
            </ul>
            <form onSubmit={handleSearchSubmit} className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchString} onChange={handleSearchInputChange}/>
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
          </div>
        </div>
      </nav>

      {pageIndex === itemList && <div>
          <h3 class="cart-name">Products Search: {SearchResults(searchString)}</h3>
          
        </div>}

      {pageIndex === home && <div>
        <h1 class="title"><center>The Poison Place</center></h1>
          <p class="home-text"><center>Welcome to the Poison Place, a catalogue of all things toxic in the natural world. Use the knowledge given here wisely! Or else...</center></p>

          {/*Disclaimer: Don't normally put raw HTML this way, this is used like this due to time constraints and having a relatively small amount of items. This code was reformatted from a multipage example.*/}

          <div id="carouselExample" class="carousel slide carousel-container">
            <div class="carousel-inner" id="main">
            <div class="carousel-item active">
              <img src="https://cdn.pixabay.com/photo/2019/09/06/10/40/fly-agaric-4456114_1280.jpg" alt="mushroom" class="center carousel-img" />
              <div class="center carousel-txt home-text">This is a pretty cool mushroom.</div>
              <a href="https://pixabay.com/photos/toadstool-nature-forest-mushroom-4456114/" class="center carousel-txt">image source</a>
            </div>
            <div class="carousel-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/PoisonOak_wb_biggerLeaves.jpg/675px-PoisonOak_wb_biggerLeaves.jpg?20140528165016" alt="poison oak" class="center carousel-img" />
              <div class="center carousel-txt home-text">This is poison oak. Touching it would be bad for you.</div>
              <a href="https://commons.wikimedia.org/wiki/File:PoisonOak_wb_biggerLeaves.jpg" class="center carousel-txt">image source</a>
            </div>
            <div class="carousel-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Atropa_belladonna_Pokrzyk_wilcza_jagoda_2016-07-23_02.jpg/1199px-Atropa_belladonna_Pokrzyk_wilcza_jagoda_2016-07-23_02.jpg?20171125135232" alt="atropa belladonna" class="center carousel-img" />
              <div class="center carousel-txt home-text">Remember kids! Don't eat suspicious berries you find on the playground. These are NOT BLUEBERRIES!!</div>
              <a href="https://commons.wikimedia.org/wiki/File:Atropa_belladonna_Pokrzyk_wilcza_jagoda_2016-07-23_02.jpg" class="center carousel-txt">image source</a>
            </div>
          </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span class="carousel-control-next-icon carousel-button" aria-hidden="true">
            <div id="extwaiokist" v="nipgg" q="4ac2859e" c="685.0" i="697" u="1.541" s="05022301" sg="svr_04262315-ga_05022301-bai_04242318" d="1" w="false" e="" a="3" m="BMe=" vn="9adfy">
              <div id="extwaigglbit" class="carousel-button" v="nipgg" q="4ac2859e" c="685.0" i="697" u="1.541" s="05022301" sg="svr_04262315-ga_05022301-bai_04242318" d="1" w="false" e="" a="3" m="BMe="></div>
            </div>
          </span>
          <span class="visually-hidden">Next</span>
        </button>
    </div>

          <footer><h6 class="footer"><center>Disclaimer: The Poison Place is not responsible for any incidents involving the toxins displayed and sold here. By accessing this site you agree to our Terms & Conditions. Misuse of any plants or animals sold via the Poison Place is punishable under federal law, and will get you in jail for 1000 years. If you feel symptoms of nausea, throwing up, fever, or have bore witness to greater beings from the fifth dimension, close this site, erase your browser history, and contact your nearest hospital.</center></h6></footer>
        </div>}

      {pageIndex === catalog && <div>
        <div>
          <h3 class="cart-name">Catalog of Products</h3>
          <button class="button-background" onClick={() => getAllProducts()}>Show All products</button>
          <input type="text" id="message" name="message" placeholder="id" onChange={(e) => getOneProduct(e.target.value)} />
          <h3 class="cart-name">Show All Available Products.</h3>
          <hr></hr>
          {viewer1 && <div>Products {showAllItems}</div>}
          <hr></hr>
        </div>
        <div><h3 class="cart-id">Show One Product by ID:</h3>
          {viewer2 && <div>Product: {showOneItem}</div>}
        </div>
        <div>
          <hr></hr>
          <h3 class="cart-add">Add a New Product (ID, name, description, price, image source, image, location):</h3>
          <form action="">
            <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
            <input type="text" placeholder="name?" name="name" value={addNewProduct.name} onChange={handleChange} />
            <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
            <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
            <input type="text" placeholder="imgSource?" name="imgSource" value={addNewProduct.imgSource} onChange={handleChange} />
            <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
            <input type="text" placeholder="location?" name="location" value={addNewProduct.location} onChange={handleChange} />
            {/* <input type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} /> */}
            <button class="button-background" type="submit" onClick={handleOnSubmit}>
              submit
            </button>
          </form>
        </div>
                        <div>
                    <h3 class="cart-update">Update a Product's Price (ID, new price):</h3>
                    <form action="">
                        <input type="number" placeholder="id?" name="_id" value={updateProduct._id} onChange={handleUpdateChange} />
                        <input type="number" placeholder="new price?" name="price" value={updateProduct.price} onChange={handleUpdateChange} />
                        <button class="button-background" type="submit" onClick={updateOneProduct}>
                            submit
                        </button>
                    </form>
                </div>
        <div>
          <h3 class="cart-delete">Delete One Product:</h3>
          <label name="acceptdelete">Check to Complete Action: </label>
          <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
            onChange={(e) => setChecked4(!checked4)} />
          <button class="button-background" onClick={() => getOneByOneProductPrev()}>Prev</button>
          <button class="button-background" onClick={() => getOneByOneProductNext()}>Next</button>
          <button class="button-background" onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
          {checked4 && (
            <div key={product[index]._id}>
              <img src={product[index].image} width={30} /> <br />
              Id:{product[index]._id} <br />
              name: {product[index].name} <br />
              {/* Category: {product[index].category} <br /> */}
              Description: {product[index].description} <br />
               Price: {product[index].price} <br />
              {/*   Rate :{product[index].rating.rate} <br />
                            Count: {product[index].rating.count} <br /> <br /> */}
            </div>
          )}
        </div>
      </div>}
      
      {pageIndex === credits && <div>
        <div>
          <h1 class="display-5 lesser-title"><center>Website Credits:</center></h1>
        </div>
        <div class="column home-text-alt">
          <h2><center>Zeynep Oghan</center></h2>
          <p><center>Appearance and Cosmetic Features</center></p>
          <p><center>zeyoghan@iastate.edu</center></p>
        </div>
        <div class="column home-text-alt-2">
          <h2><center>Alix Noble</center></h2>
          <p><center>Design and Infrastructure</center></p>
          <p><center>anoble@iastate.edu</center></p>
        </div>

        <div class="footer" ><center>
          SE/ComS319 Construction of User Interfaces, 5/6/2023, Abraham Aldaco</center>
        </div>
        <div class="footer"><center>
          This site is a catalogue of poisonous entities from the natural world. It is intended solely for educational purposes, including if the user decides to buy an item.</center>
        </div>
      </div>}
      {/* <div onClick={() => toggleShopAndCredits()}><button class="button-background">{pageIndex ? "Return to Shopping" : "Go to Credits"}</button></div> */}
    </div>
  ); // return end
}; // App end
export default App;
