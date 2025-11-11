<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario Clientes</title>
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
$cedula_cliente = $_POST['cedula_cliente'];
$nombre_cliente = $_POST['nombre_cliente'];
$correo_cliente = $_POST['correo_cliente'];
$direccion_cliente = $_POST['direccion_cliente'];
$telf_cliente = $_POST['telf_cliente'];
$cod_tipo_clientes = $_POST['cod_tipo_clientes'];

//validar
$sql = "INSERT INTO clientes (nombre_cliente, cedula_cliente, correo_cliente, direccion_cliente, telf_cliente, cod_tipo_clientes)
VALUES ('$nombre_cliente','$cedula_cliente','$correo_cliente','$direccion_cliente','$telf_cliente','$cod_tipo_clientes')";

if (mysqli_query($conn, $sql)) {
  echo "La información del cliente se ha actualizado correctamente.";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

// This is where you replace your existing query
$consulta = "SELECT cedula_cliente, nombre_cliente, correo_cliente, direccion_cliente, telf_cliente, cod_tipo_clientes FROM clientes";
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
echo "<th><h4>Tipo de Clientes</th></h4>";
echo "</tr>";

while ($colum = mysqli_fetch_array($result))
 {
    echo "<tr>";
    echo "<td><p>" . $colum['cedula_cliente']. "</td></p>";
    echo "<td><p>" . $colum['nombre_cliente']. "</td></p>";
    echo "<td><p>" . $colum['correo_cliente'] . "</td></p>";
    echo "<td><p>" . $colum['direccion_cliente'] . "</td></p>";
    echo "<td><p>" . $colum['telf_cliente'] . "</td></p>";
    echo "<td><p>" . $colum['cod_tipo_clientes'] . "</td></p>";
    echo "</tr>";
}
echo "</table>";

mysqli_close($conn);

echo'<a href="form clientes.html"> Volver Atrás</a>';

?>