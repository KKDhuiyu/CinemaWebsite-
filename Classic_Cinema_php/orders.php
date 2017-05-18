<!DOCTYPE html>

<html>
    <head>
        <title>Orders</title>
        <link rel="stylesheet" href="style.css">
        <meta charset="utf-8">
<?php
    $scriptList = array('jquery-1.11.3.min.js', 'showHide.js', 'cookies.js', 'cart.js', 'reviews.js');
    $currentPage = basename($_SERVER['PHP_SELF']);
    include('restricted/header.php');
?>
        <div id="main">
            <?php
                if(isset ($_SESSION['authenticatedUser'])){
                $orders = simplexml_load_file('orders.xml');
                foreach ($orders->order as $order) {
                    $name = $order->delivery->name;
                    echo "</p>Name: $name<p>";  
                    $email = $order->delivery->email;
                    echo "</p>Email: $email<p>";  
                    $address = $order->delivery->address;
                    echo "</p>Address: $address<p>";  
                    $city = $order->delivery->city;
                    echo "</p>City: $city<p>";  
                    $postcode = $order->delivery->postcode;
                    echo "<p>Postcode: $postcode<p>";
                    $items = $orders->xpath('//item');
                    echo "<p> Movies: </p> <ul>";
                    
                    foreach ($order->items->item as $item) {
                        $title = $item->title;  
                        $price = $item->price;
                        echo "<li> $title  $$price</li>";
                    }
                    echo "</ul></p></br>";
                }
            } else {
                    header('location: index.php');
                    exit;
                }
            ?>
        </div>
        <?php include ("restricted/footer.php");?>
    </body>
</html>