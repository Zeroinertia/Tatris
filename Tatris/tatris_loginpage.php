<!doctype html>
<html>
<head>

<?php
	require "connection.php";
	session_start();
?>
<?php
	if(isset($_GET['ktss'])) {
		if($_GET['ktss']=="f") {
			echo "Virheellinen käyttäjätunnus tai salasana.";
		} else if($_GET['ktss']=="lo") {
			echo "Olet kirjautunut ulos.";
		}
	}
?>


<meta charset="utf-8">
<title>Tatris</title>
</head>

<body>

<form action="login_check.php" method="post" class="afterfloat">
<fieldset style="width:150px"><legend>&nbsp;Kirjautuminen&nbsp;</legend>
<p>Käyttäjänimi: <input type="text" name="uname" /></p>
<p>Salasana: <input type="password" name="pword" /></p>
<p><input type="submit" name="submit" value="Kirjaudu" /></p>
</fieldset>
</form>

</body>
</html>