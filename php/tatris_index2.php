<?php
	require "connection.php";
	session_start();
	if(!array_key_exists('login',$_SESSION))
	{
		header("location:tatris_login.php?ktss=f");
	}
?>


<!DOCTYPE html>
<html>

<head>

	<meta charset="utf-8">
	<!-- Latest compiled and minified CSS, jQuery library, and Latest compiled JavaScript -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="../style/tatris_style.css" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
<title>TATRIS</title>
</head>

<body>
<script>
	function logout() 
	{
		if(window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xmlhttp.open("GET","tatris_disconnect.php",true);
		xmlhttp.send();
		window.location = "tatris_login.php?ktss=lo";
	
	}
</script>

<div class="wrapper">
	<div class="left-floater">
		<div id="gameBoard" >
			<canvas id="gameCanvas" height="640px" width="320"></canvas>
		</div>
	</div>
	
	<div class="right-floater">
		<div class="sidebar" >
			<p><button type="button" class="btn btn-block" id="logoutButton" onclick="logout()" style="background-color:#000;">Log out</button></p>
			<p>Lines: <span id="lines"></span>
			<br>Score: <span id="points"></span></p>
		</div>
		
		<div class="sidebar" >
			<p>Personal best: <span id="highscore"></span></p>
		</div>
	
		<div class="sidebar" >
			<p>Top-10
			<br><embed src="tatris_topten.php" id="topten"></p>
		</div>
	</div>
</div>

<script type="text/javascript" src="../js/tatris_pieces.js"></script>
<script type="text/javascript" src="../js/tatris_BulkImageLoader.js"></script>

<script type="text/javascript" src="../js/tatris_logic.js"></script>
<script>
	// Logout when closing the site.
	window.onbeforeunload = function logout() 
	{
		if(window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xmlhttp.open("GET","tatris_disconnect.php",true);
		xmlhttp.send();
		
	}
</script>

</body>

</html>






