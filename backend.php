<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = $_POST['response'];  // 1. The data sent from the browser
    $file = 'responses.txt';         // 2. File where the data will be stored
    $entry = date('Y-m-d H:i:s') . " - Answer: " . $response . "\n";  // 3. Data to be saved in the file
    file_put_contents($file, $entry, FILE_APPEND);  // 4. Save data to the file
    echo json_encode(['status' => 'success']);  // 5. Response sent back to the browser
} else {
    echo json_encode(['status' => 'error']);  // 6. Error if it's not a POST request
}
?>
