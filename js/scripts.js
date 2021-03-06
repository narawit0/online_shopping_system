
function show_product_details(id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "product_details.php?id=" + id, true);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("popup").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.send();
}

function close_popup() {
    document.getElementById("popup").innerHTML = "";
}

document.getElementById('popup').addEventListener('click', function(e){
    if(event.target.id === 'buy') {
        var quanity = document.getElementById('quanity').value;
        var pro_id  = document.getElementById('id').value;
        add_product_to_cart(pro_id, null, quanity);
    }
});

// หยิบสินค้าใส่ตะกร้า
function add_product_to_cart(pro_id, cat_id, quanity=1) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "add_cart.php", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(this.responseText) {
               alert(this.responseText);
            } else {
                get_cart_count();
                if(!cat_id) {
                    show_all_products();
                } else {
                    show_all_products_by_cat_id(cat_id);
                }
            }
        }
    }
    xmlhttp.send("id=" + pro_id + "&quanity=" + quanity);
}

function show_all_products(page) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "show_all_products.php?page= " + page, true);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('main-conntent--right').innerHTML = this.responseText;
        }
    }
    xmlhttp.send();
}

function show_all_products_by_cat_id(cat_id, page) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "show_products_cat_id.php?cat_id= " + cat_id + "&page= " + page, true);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('main-conntent--right').innerHTML = this.responseText;
        }
    }
    xmlhttp.send();
}


//นับจำนวนสินค้าในตะกร้า
function get_cart_count() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "cart_count.php", true);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('cart--count--display').innerHTML = this.responseText;
        }
    }
    xmlhttp.send();
}

function get_delivery_count() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "delivery_count.php", true);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('delivery--count--display').innerHTML = this.responseText;
        }
    }
    xmlhttp.send();
}

function getVals() {
    var parent = document.querySelector('.range-slider');
    var slides = parent.getElementsByTagName('input');
    var slide1 = parseFloat( slides[0].value );
    var slide2 = parseFloat( slides[1].value );
    if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }

    var price1_display = document.querySelector('.price-1');
    var price2_display = document.querySelector('.price-2');
    price1_display.innerHTML = new Intl.NumberFormat().format(slide1);
    price2_display.innerHTML = new Intl.NumberFormat().format(slide2);
}

function addRangeSliderEvent (){
    // Initialize Sliders
    var sliderSections = document.getElementsByClassName("range-slider");
        for( var x = 0; x < sliderSections.length; x++ ){
          var sliders = sliderSections[x].getElementsByTagName("input");
          for( var y = 0; y < sliders.length; y++ ){
            if( sliders[y].type ==="range" ){
              sliders[y].oninput = getVals;
              // Manually trigger event first time to display values
              sliders[y].oninput();
            }
          }
        }
  }

  addRangeSliderEvent();



get_cart_count();
get_delivery_count()
