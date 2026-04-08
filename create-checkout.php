<?php
// create-checkout.php
// Your Yoco Secret Key (get this from Yoco dashboard → Payment Gateway)
$secretKey = ' sk_live_f071332c3mkPO9gfc5c4bad97799 '; // 🔴 REPLACE WITH YOUR ACTUAL SECRET KEY

// Get the amount from the request
$input = json_decode(file_get_contents('php://input'), true);
$amountInCents = $input['amount'] ?? 0;

if ($amountInCents <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid amount']);
    exit;
}

// Prepare the API request to Yoco
$postData = [
    'amount' => $amountInCents,
    'currency' => 'ZAR',
    'successUrl' => 'https://yourdomain.com/success.html', // 🔴 CHANGE TO YOUR DOMAIN
    'cancelUrl' => 'https://yourdomain.com/cancel.html',   // 🔴 CHANGE TO YOUR DOMAIN
    'failureUrl' => 'https://yourdomain.com/failure.html'  // 🔴 CHANGE TO YOUR DOMAIN
];

// Call Yoco API
$ch = curl_init('https://payments.yoco.com/api/checkouts');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $secretKey
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 201) {
    $result = json_decode($response, true);
    echo json_encode(['redirectUrl' => $result['redirectUrl']]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Checkout creation failed', 'details' => $response]);
}
?>
