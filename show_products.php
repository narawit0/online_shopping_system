<main class="main-content">
        <div class="container">
            <aside class="main-content--left">
                test
            </aside>
            <section class="main-conntent--right">
                <?php
                    if(empty($_GET['cat_id']) || !isset($_GET['cat_id'])) {

                    $products = Product::select_all_products(); 
                    while($row = mysqli_fetch_assoc($products)) {
                ?>
                    <div class="product">
                        <figure class="product--image">
                            <img src="<?php echo "." . DS . "images" . DS . $row['image']?>" alt="">
                        </figure>
                        <span class="product--price">ราคา: <?php echo $row['price']; ?> บาท</span>
                        <span class="product--name">ชื่อสินค้า: <?php echo $row['name']?></span>
                        <div class="button-group">
                            <a href="javascript:void(0);" class="product--button product--button-detail" onclick="show_product_details(<?php echo $row['id']; ?>)">รายละเอียด</a>
                            <a href="javascript:void(0);" class="product--button product--button-buy" onclick="add_product_to_cart(<?php echo $row['id']; ?>)">ซื้อเลย</a>
                        </div>
                    </div>
                <?php        
                    }
                } elseif(!empty($_GET['cat_id']) || isset($_GET['cat_id'])) {
                    $cat_id = $_GET['cat_id'];

                    $products = Product::select_products_by_cat_id($cat_id); 
                    while($row = mysqli_fetch_assoc($products)) {
                ?>
                    <div class="product">
                        <figure class="product--image">
                            <img src="<?php echo "." . DS . "images" . DS . $row['image']?>" alt="">
                        </figure>
                        <span class="product--price">ราคา: <?php echo $row['price'];?> บาท</span>
                        <span class="product--name">ชื่อสินค้า: <?php echo $row['name']; ?></span>
                        <div class="button-group">
                            <a href="javascript:void(0);" class="product--button product--button-detail" onclick="show_product_details(<?php echo $row['id']; ?>)">รายละเอียด</a>
                            <a href="javascript:void(0);" class="product--button product--button-buy" onclick="add_products_to_cart(<?php echo $row['id']; ?>)">ซื้อเลย</a>
                        </div>
                    </div>
                <?php
                    }
                }
                ?>
            </section>
            <div id="popup"></div>
        </div>
    </main>