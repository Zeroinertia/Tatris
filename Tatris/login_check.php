<?php
	require "connection.php";
	session_start();
?>

<?php
	if(isset($_POST['submit'])) {
		$user = mysqli_real_escape_string($con, $_POST['uname']);
		$pass = mysqli_real_escape_string($con, $_POST['pword']);
		
		$kysely = "SELECT * FROM users WHERE username='$user' AND password='$pass'";
		
		$tulos = mysqli_query($con, $kysely);
		$tasmasiko = mysqli_num_rows($tulos);
		
		if($tasmasiko == 1) {
			$_SESSION['login'] = 1;
			$_SESSION['abuser'] = $_POST['uname'];
			header("location:tatris_index2.php");
		} else {
			session_destroy();
			header("location:tatris_loginpage.php?ktss=f");
		}
	}
?>