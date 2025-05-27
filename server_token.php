<?php
// filepath: c:\xampp\htdocs\server_token.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$clientId = '55b8ea7b1ff946689ee6b3bbd9302bb4';
$clientSecret = '89364b4aac1d40b0a6bba5458a1c5165';

// cURL kullanarak Spotify token isteği
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://accounts.spotify.com/api/token');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials');
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Authorization: Basic ' . base64_encode($clientId . ':' . $clientSecret),
    'Content-Type: application/x-www-form-urlencoded'
));

$result = curl_exec($ch);
if(curl_errno($ch)){
    echo json_encode(['error' => curl_error($ch)]);
    exit;
}
curl_close($ch);

echo $result;
?>