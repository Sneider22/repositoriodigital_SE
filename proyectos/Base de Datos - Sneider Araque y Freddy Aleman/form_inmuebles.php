<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario Inmuebles</title>
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
$cod_inmuebles = $_POST['cod_inmuebles'];
$ubicacion_inmuebles = $_POST['ubicacion_inmuebles'];
$nombre_inmuebles = $_POST['nombre_inmuebles'];
$cod_tipo = $_POST['cod_tipo'];
$foto_inmuebles = $_POST['foto_inmuebles'];
$precio_inmuebles = $_POST['precio_inmuebles'];

//validar
$sql = "INSERT INTO inmuebles (ubicacion_inmuebles, cod_inmuebles, nombre_inmuebles, cod_tipo, foto_inmuebles, precio_inmuebles)
VALUES ('$ubicacion_inmuebles','$cod_inmuebles','$nombre_inmuebles','$cod_tipo','$foto_inmuebles','$precio_inmuebles')";

if (mysqli_query($conn, $sql)) {
  echo "La información del inmueble se ha actualizado correctamente.";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

// This is where you replace your existing query
$consulta = "SELECT cod_inmuebles, ubicacion_inmuebles, nombre_inmuebles, cod_tipo, foto_inmuebles, precio_inmuebles FROM inmuebles";
$result = mysqli_query($conn,$consulta);

if(!$result) 
{
    echo "No se ha podido realizar la consulta";
}

echo "<table>";
echo "<tr>";
echo "<th><h4>Código de inmuebles</th></h4>";
echo "<th><h4>Ubicación</th></h4>";
echo "<th><h4>Nombre</th></h4>";
echo "<th><h4>Codigo de Tipo</th></h4>";
echo "<th><h4>Foto</th></h4>";
echo "<th><h4>Precio</th></h4>";
echo "</tr>";

while ($colum = mysqli_fetch_array($result))
 {
    echo "<tr>";
    echo "<td><p>" . $colum['cod_inmuebles']. "</td></p>";
    echo "<td><p>" . $colum['ubicacion_inmuebles']. "</td></p>";
    echo "<td><p>" . $colum['nombre_inmuebles'] . "</td></p>";
    echo "<td><p>" . $colum['cod_tipo'] . "</td></p>";
    echo "<td><img width='130px' src='" . $colum['foto_inmuebles'] . "'/></td>";
    echo "<td><p>" . $colum['precio_inmuebles'] . "</td></p>";
    echo "</tr>";
}
echo "</table>";

mysqli_close($conn);

echo'<a href="form inmuebles.html"> Volver Atrás</a>';

?>