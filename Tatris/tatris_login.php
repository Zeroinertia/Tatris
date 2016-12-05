<!DOCTYPE html>
<html lang="en">
<head>

<?php
	require "connection.php";
	session_start();
?>
<?php
	if(isset($_GET['ktss']))
	{
		if($_GET['ktss']=="f")
		{
			echo "<script type=\"javascript\">alert(\"Wrong username or password.\");</script>";
		}
		else if($_GET['ktss']=="lo")
		{
			echo "<script type=\"javascript\">alert(\"You've logged out successfully.\");</script>";
		}
		else if($_GET['ktss']=="iv")
		{
			echo "<script>alert('Username already in use.');</script>";
		}
	}
?>

<meta charset="utf-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Tatris</title>

<style>
	body
	{
		background-color:#000;
	}
	
	.jumbotron
	{
		text-align:center;
		background-image:url("cube.png");
		background-size:80%;
	}
	.dropdown-menu
	{
		padding:3px;
		width:250px;
	}
	#myNavBar
	{
		margin:auto;
		width:210px;
	}
</style>

</head>

<body>

<div class="container">
	<div class="jumbotron">
		<h1>SUPER TATRIS</h1>
	</div>
</div>

<nav class="navbar navbar-inverse">
	<div class="container-fluid">
		<div id="myNavBar">
			<ul class="nav navbar-nav">
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown">Login <span class="glyphicon glyphicon-log-in"></span></a>
					<form class="dropdown-menu" action="login_check.php" method="post">
						<fieldset>
							<legend>Login Information</legend>
							<p>Username: <input type="text" name="uname" /></p>
							<p>Password: &nbsp;<input type="password" name="pword" /></p>
							<p><input type="submit" name="submit" value="Login" /></p>
						</fieldset>
					</form>
				</li>
				
				<li class="dropdown">
					<a class="dropdown-toggle" data-toggle="dropdown">Sign up <span class="glyphicon glyphicon-user"></span></a>
					<form class="dropdown-menu" action="tatris_signup.php" method="post">
						<fieldset>
							<legend>Signup Information</legend>
							<p>Username: <input type="text" name="uname" /></p>
							<p>Password: &nbsp;<input type="password" name="pword" /></p>
							<p><input type="submit" name="submit" value="Sign up" /></p>
						</fieldset>
					</form>
				</li>
			</ul>
		</div>
	</div>

</nav>

</body>
</html>
