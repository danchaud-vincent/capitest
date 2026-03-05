<?php
$allowedOrigin = 'http://localhost:4200';

if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowedOrigin) {
    header("Access-Control-Allow-Origin: {$allowedOrigin}");
    header('Vary: Origin');
    header('Access-Control-Allow-Credentials: true');
} else {
    http_response_code(403);
    die(json_encode(['error' => 'invalid origin']));
}


header('Access-Control-Allow-Methods: GET, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, AUTH_TOKEN, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

session_start();

$authToken = $_SERVER['HTTP_AUTH_TOKEN']
    ?? $_SERVER['REDIRECT_HTTP_AUTH_TOKEN']
    ?? $_SERVER['HTTP_AUTHORIZATION']
    ?? null;

$method = $_SERVER['REQUEST_METHOD'];
$data = array(
    0 => array(
        'title' => 'Titre 1',
        'description' => 'Description 1',
        'date' => '2023-09-01',
        'titleHistory' =>
        array(
            'titre',
            'titre tEST',
            'Titre Test'
        )
    ),
    1 => array(
        'title' => 'Titre 2',
        'description' => 'Description 2',
        'date' => '2024-09-02',
        'titleHistory' =>
        array()
    ),
    2 => array(
        'title' => 'Titre 3',
        'description' => 'Description 3',
        'date' => '2025-09-03',
        'titleHistory' =>
        array()
    ),
    4 => array(
        'title' => 'Titre 5',
        'description' => 'Description 5',
        'date' => '2025-10-03',
        'titleHistory' =>
        array()
    ),
);
if (!isset($_SESSION['data'])) {
    $_SESSION['data'] = $data;
}


if (isset($authToken) && $authToken == 'token123') {
    $path = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/'));
    $module = end($path) === 'items' ? 'items' : $path[2] ?? null;
    if ($module != 'items') {
        http_response_code(404);
        die(json_encode(['error' => 'module not found']));
    }
    switch ($method) {
        case 'PUT':
            $path = explode('/', trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/'));
            $id = end($path);
            if ($id != null) {
                if (!ctype_digit($id) || !isset($_SESSION['data'][(int)$id])) {
                    http_response_code(404);
                    die(json_encode(['error' => 'resource not found']));
                }
                $put_data = json_decode(file_get_contents('php://input'), true);
                if ($put_data === null && json_last_error() !== JSON_ERROR_NONE) {
                    http_response_code(400);
                    die(json_encode(['error' => 'invalid json body']));
                }
                if (!isset($put_data['title']) || !is_string($put_data['title']) || trim($put_data['title']) === '') {
                    http_response_code(400);
                    die(json_encode(['error' => 'invalid title']));
                }
                $_SESSION['data'][$id]['titleHistory'][] = $_SESSION['data'][$id]['title'];
                $_SESSION['data'][$id]['title'] = $put_data['title'];
                die(json_encode($_SESSION['data'][$id]));
            } else {
                http_response_code(400);
                die(json_encode(['error' => 'no id provided']));
            }
            break;
        case 'GET':
            die(json_encode($_SESSION['data']));
        default:
            http_response_code(405);
            die(json_encode(['error' => 'method not allowed']));
    }
} else {
    http_response_code(401);
    die(json_encode(['error' => 'invalid auth token']));
}
