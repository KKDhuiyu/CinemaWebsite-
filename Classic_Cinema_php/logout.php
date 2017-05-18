<?php
    session_start();
?>

<html>

<body>
        <?php
    $scriptList = array('jquery-1.11.3.min.js', 'cookies.js');

    include("validationFunctions.php");
?>


<?php
unset($_SESSION['authenticatedUser']);
?>
<?php
header('Location: '.$_SESSION['lastPage']);
    exit; 
?>