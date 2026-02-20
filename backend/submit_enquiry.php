<?php
session_start();
require_once "config.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!$pdo) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$uploadDir = "uploads/enquiries/";

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$allowedTypes = ['jpg','jpeg','png','pdf','doc','docx','psd','ai','zip'];
$maxFileSize = 10 * 1024 * 1024;

$filePath = null;

if (!empty($_FILES['reference_file']['name'])) {
    $fileTmp  = $_FILES['reference_file']['tmp_name'];
    $fileSize = $_FILES['reference_file']['size'];
    $ext = strtolower(pathinfo($_FILES['reference_file']['name'], PATHINFO_EXTENSION));

    if (!in_array($ext, $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type']);
        exit;
    }

    if ($fileSize > $maxFileSize) {
        http_response_code(400);
        echo json_encode(['error' => 'File size must be under 10MB']);
        exit;
    }

    $filePath = $uploadDir . time() . "_" . uniqid() . "." . $ext;
    move_uploaded_file($fileTmp, $filePath);
}

$serviceTypes = $_POST['service_type'] ?? [];
$contactPrefs = $_POST['contact_preference'] ?? [];

$data = [
    'full_name'           => trim($_POST['full_name']),
    'email'               => trim($_POST['email']),
    'phone'               => trim($_POST['phone']),
    'company'             => $_POST['company'] ?? null,
    'location'            => $_POST['location'] ?? null,
    'service_type'        => is_array($serviceTypes) ? implode(', ', $serviceTypes) : $serviceTypes,
    'other_service'       => $_POST['other_service'] ?? null,
    'project_type'        => $_POST['project_type'],
    'project_description' => $_POST['project_description'],
    'design_style'        => $_POST['design_style'] ?? null,
    'file_path'           => $filePath,
    'deadline'            => $_POST['deadline'] ?? null,
    'budget_range'        => $_POST['budget_range'] ?? null,
    'contact_preference'  => is_array($contactPrefs) ? implode(', ', $contactPrefs) : $contactPrefs,
    'best_time'           => $_POST['best_time'] ?? null,
    'hear_about'          => $_POST['hear_about'] ?? null,
    'other_source'        => $_POST['other_source'] ?? null,
    'additional_notes'    => $_POST['additional_notes'] ?? null
];

if (
    empty($data['full_name']) ||
    empty($data['email']) ||
    empty($data['phone']) ||
    empty($data['service_type']) ||
    empty($data['project_type']) ||
    empty($data['project_description']) ||
    empty($data['contact_preference'])
) {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill all required fields']);
    exit;
}

$sql = "
INSERT INTO enquiries (
    full_name, email, phone, company, location,
    service_type, other_service, project_type,
    project_description, design_style, file_path,
    deadline, budget_range, contact_preference,
    best_time, hear_about, other_source,
    additional_notes
)
VALUES (
    :full_name, :email, :phone, :company, :location,
    :service_type, :other_service, :project_type,
    :project_description, :design_style, :file_path,
    :deadline, :budget_range, :contact_preference,
    :best_time, :hear_about, :other_source,
    :additional_notes
)";

$stmt = $pdo->prepare($sql);
$stmt->execute($data);

http_response_code(201);
echo json_encode([
    'message' => 'Enquiry submitted successfully',
    'id' => $pdo->lastInsertId()
]);
