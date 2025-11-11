<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario Propietarios</title>
    <style type="text/css">
      table {
        border: solid 2px #7e7c7c;
        border-collapse: collapse;
      }
      th, h4 {
        background-color: #edf797;
      }
      td, th {
        border: solid 1px #7e7c7c;
        padding: 2px;
        text-align: center;
      }
    </style>
</head>
<body>
</body>
</html>

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "inmuebles";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Get form data
$cedula_propietario = $_POST['cedula_propietario'];
$nombre_propietario = $_POST['nombre_propietario'];
$correo_propietario = $_POST['correo_propietario'];
$direccion_propietario = $_POST['direccion_propietario'];
$telf_propietario = $_POST['telf_propietario'];
$cod_inmuebles = $_POST['cod_inmuebles'];

//validar
$sql = "INSERT INTO propietarios (nombre_propietario, cedula_propietario, correo_propietario, direccion_propietario, telf_propietario, cod_inmuebles)
VALUES ('$nombre_propietario','$cedula_propietario','$correo_propietario','$direccion_propietario','$telf_propietario','$cod_inmuebles')";

if (mysqli_query($conn, $sql)) {
  echo "La información del propietario se ha actualizado correctamente.";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

// This is where you replace your existing query
$consulta = "SELECT cedula_propietario, nombre_propietario, correo_propietario, direccion_propietario, telf_propietario, cod_inmuebles FROM propietarios";
$result = mysqli_query($conn,$consulta);

if(!$result) 
{
    echo "No se ha podido realizar la consulta";
}

echo "<table>";
echo "<tr>";
echo "<th><h4>Cedula</th></h4>";
echo "<th><h4>Nombre</th></h4>";
echo "<th><h4>Correo</th></h4>";
echo "<th><h4>Direccion</th></h4>";
echo "<th><h4>Telefono</th></h4>";
echo "<th><h4>Codigo de Inmuebles</th></h4>";
echo "</tr>";

while ($colum = mysqli_fetch_array($result))
 {
    echo "<tr>";
    echo "<td><p>" . $colum['cedula_propietario']. "</td></p>";
    echo "<td><p>" . $colum['nombre_propietario']. "</td></p>";
    echo "<td><p>" . $colum['correo_propietario'] . "</td></p>";
    echo "<td><p>" . $colum['direccion_propietario'] . "</td></p>";
    echo "<td><p>" . $colum['telf_propietario'] . "</td></p>";
    echo "<td><p>" . $colum['cod_inmuebles'] . "</td></p>";
    echo "</tr>";
}
echo "</table>";

mysqli_close($conn);

echo'<a href="form propietarios.html"> Volver Atrás</a>';

?>