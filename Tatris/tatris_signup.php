<?php
	require "connection.php";
	session_start();
?>

<?php
	if(isset($_POST['submit']))
	{
		$user = mysqli_real_escape_string($con, $_POST['uname']);
		$pass = mysqli_real_escape_string($con, $_POST['pword']);
		
		$kysely = "INSERT INTO `tatris`.`users` (`id`, `username`, `password`, `highscore`) VALUES (NULL, '$user', '$pass', '0')";
		
		$tulos = mysqli_query($con, $kysely);
		
		if($tulos)
		{
			$_SESSION['login'] = 1;
			$_SESSION['abuser'] = $_POST['uname'];
			header("location:tatris_index2.php");
		}
		else
		{
			session_destroy();
			header("location:tatris_login.php?ktss=iv");
		}
	}
?>