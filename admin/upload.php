<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
    exit;
}

$section = $_POST['section'] ?? '';
if (empty($section)) {
    echo json_encode(['success' => false, 'message' => 'Sezione non specificata']);
    exit;
}

$uploadDir = '../images/' . $section . '/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$uploadedFiles = [];
$errors = [];

if (!empty($_FILES['images'])) {
    foreach ($_FILES['images']['name'] as $key => $name) {
        $tmpName = $_FILES['images']['tmp_name'][$key];
        $fileName = uniqid() . '_' . basename($name);
        $destination = $uploadDir . $fileName;

        if (move_uploaded_file($tmpName, $destination)) {
            $uploadedFiles[] = $fileName;
        } else {
            $errors[] = $name;
        }
    }
}

if (count($uploadedFiles) > 0) {
    echo json_encode([
        'success' => true,
        'message' => count($uploadedFiles) . ' immagini caricate con successo nella cartella: ' . $section,
        'files' => $uploadedFiles
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Nessuna immagine caricata']);
}
?>