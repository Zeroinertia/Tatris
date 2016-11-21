<?php
	require "connection.php";
	session_start();
?>
<?php
	$newScore = $_GET['s'];
	
	$user = $_SESSION['abuser'];
	
	$sql = "SELECT highscore FROM users WHERE username='$user'";
	$query = mysqli_query($con, $sql);
	
	$result = mysqli_fetch_row($query);
	
	if($newScore > $result[0]) {
		$sql = "UPDATE users SET highscore='$newScore' WHERE username='$user'";
		$newQuery = mysqli_query($con, $sql);
	}
?>