<!DOCTYPE>
<html>

<head>
    <title>Hello Form</title>
    <meta charset="utf-8">
</head>

<body>
    <?php


if(isset($_GET['submit'])) { 
    if (strlen(trim($_GET['user'])) > 0){      
        $user = htmlentities(($_GET['user']));
        echo "Hello $user";
    }
    
     } else{
    ?>
        <form action="<?php echo $_SERVER['PHP_SELF'];?>" method='GET'>

            <label for='user'>User Name: </label>
            <input type='text' name='user'>
            <input type='submit' name='submit' value="Submit">
        </form>
        <?php } ?>
</body>






</html>
