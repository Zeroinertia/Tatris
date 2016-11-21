<?php
	require "connection.php";
	session_start();
?>
<?php
	
	$user = $_SESSION['abuser'];
	
	$sql = "SELECT highscore FROM users WHERE username='$user'";
	$query = mysqli_query($con, $sql);
	
	$result = mysqli_fetch_row($query);
	
	$highScore = $result[0]
  
  return $highScore;
?>
