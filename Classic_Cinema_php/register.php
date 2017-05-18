<?php
    $scriptList = array("jquery-1.11.3.min.js","cookie.js");
   
    include("restricted/header.php");
    include("restricted/validationFunctions.php");
    ?>

    <div id="main">
        <?php
	
	if (isset($_POST['registerSubmit'])) {
		$formOK = true;
        $new_username = $_POST['registerName'];
		$new_username =$_POST['registerName'];
        $email =($_POST['registerEmail']);
		$password = ($_POST['registerPassword']);
		$confirmpw =( $_POST['confirmPW']);
        
        
        if (isEmpty($new_username)){
            echo "Enter a user name";
            $formOK= false;
        }
        else if (!isEmail($email)){
           $formOK =false;
           echo "Enter a correct email";
         }
           
      /*  else if (strlen(trim($password)) < 8) {
			echo "Password should be at least 8 characters long!".PHP_EOL;
			$formOK = false;
		} else if (!preg_match("#[0-9]+#", $password)) {
        	echo "Password must include at least one number!".PHP_EOL;
			$formOK = false;
    	} else if (!preg_match("#[a-zA-Z]+#", $password)) {
        	echo "Password must include at least one letter!".PHP_EOL;
			$formOK = false;
    	}*/ 
         if ($password !== $confirmpw){
                echo "Passwords must match";
                $formOK = false;
            }
		
                                
            
        
        if ($formOK) {
          
		
	$conn = new mysqli('sapphire', 'bcarter', 'sheep213', 'bcarter_dev');
if ($conn->connect_errno) {
    echo "Connection issues";
// Something went wrong connecting
}        
 $new_username = $conn->real_escape_string($new_username);
 $password = $conn->real_escape_string($password);     

  
$query = "SELECT * FROM Users WHERE username = '$new_username'";
$result = $conn->query($query);

            
if ($result->num_rows === 0) { 
    echo "Name was avalible";
   
    
      $query = "INSERT INTO Users (username, password, email, role) " .
      "VALUES ('$new_username', SHA('$password'), '$email', '$role')";
   
    $conn->query($query);
    if($conn->error) {
    echo "nope";
// Something went wrong
    }  
    
            
// OK, there is no user with that username
} else {
    echo "name taken";
// Problem -- username is already taken
}
$result->free();
$conn->close();
        }
    }
	
?>

        
    <form id="registerForm" action ="<?php echo $_SERVER['PHP_SELF']; ?>" method ="POST">
         <fieldset>
                <legend>Register With Us</legend>
                <p> 
                    <label for="registerName">Name: </label>
                    <input type="text" name='registerName' id='registerName' required>
                </p>
                <p>
                    <label for="registerEmail">Email:</label>
                    <input type="email" name="registerEmail" id="registerEmail" required>            
                </p>
                <p>
                    <label for="password">Password:</label>
                    <input type="password" name="registerPassword" id="registerPassword" required>
                </p>
             <p>
                 <label for="confirmPW">Confirm Password:</label>
                     <input type="password" name ="confirmPW" id = "confirmPW" required> 
             </p>
                
             <p>
                 <input type="submit" name='registerSubmit' id = 'registerSubmit' value="Submit">
             </p>
        </fieldset>
        
        </form>    
        
        
</div>

 <?php include("restricted/footer.php"); ?>
