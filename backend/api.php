<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$request = $_GET['request'] ?? '';

$parts = explode('/', trim($request, '/'));
$endpoint = $parts[0] ?? '';
$id = $parts[1] ?? null;

function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function getJsonInput() {
    $input = file_get_contents('php://input');
    return json_decode($input, true) ?? $_POST;
}

try {
    switch ($endpoint) {
        case 'slides':
            handleSlides($method, $id);
            break;
        case 'team':
            handleTeam($method, $id);
            break;
        case 'websites':
            handleWebsites($method, $id);
            break;
        case 'logos':
            handleLogos($method, $id);
            break;
        case 'graphics':
            handleGraphics($method, $id);
            break;
        case 'flyers':
            handleFlyers($method, $id);
            break;
        case 'uiux':
            handleUiux($method, $id);
            break;
        case 'videos':
            handleVideos($method, $id);
            break;
        case 'enquiries':
            handleEnquiries($method, $id);
            break;
        case 'auth':
            handleAuth($method);
            break;
        case 'admin':
            handleAdmin($method, $id);
            break;
        case 'upload':
            handleUpload();
            break;
        case 'health':
            jsonResponse(['status' => 'ok', 'timestamp' => time()]);
            break;
        default:
            jsonResponse(['error' => 'Endpoint not found'], 404);
    }
} catch (Exception $e) {
    jsonResponse(['error' => $e->getMessage()], 500);
}

function handleSlides($method, $id) {
    global $pdo;
    
    if ($method === 'GET') {
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM carousel_slides WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            $slide = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$slide) {
                jsonResponse(['error' => 'Slide not found'], 404);
            }
            jsonResponse($slide);
        } else {
            $stmt = $pdo->query("SELECT * FROM carousel_slides WHERE is_active = 1 ORDER BY display_order ASC");
            jsonResponse($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    } elseif ($method === 'POST') {
        $data = getJsonInput();
        $stmt = $pdo->prepare("INSERT INTO carousel_slides (title, subtitle, description, image_url, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['title'] ?? '',
            $data['subtitle'] ?? '',
            $data['description'] ?? '',
            $data['image_url'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1
        ]);
        jsonResponse(['id' => $pdo->lastInsertId(), 'message' => 'Slide created']);
    } elseif ($method === 'PUT' && $id) {
        $data = getJsonInput();
        $stmt = $pdo->prepare("UPDATE carousel_slides SET title = ?, subtitle = ?, description = ?, image_url = ?, display_order = ?, is_active = ? WHERE id = ?");
        $stmt->execute([
            $data['title'] ?? '',
            $data['subtitle'] ?? '',
            $data['description'] ?? '',
            $data['image_url'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1,
            $id
        ]);
        jsonResponse(['message' => 'Slide updated']);
    } elseif ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM carousel_slides WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse(['message' => 'Slide deleted']);
    }
}

function handleTeam($method, $id) {
    global $pdo;
    
    if ($method === 'GET') {
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM team_members WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            $member = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$member) {
                jsonResponse(['error' => 'Team member not found'], 404);
            }
            jsonResponse($member);
        } else {
            $stmt = $pdo->query("SELECT * FROM team_members WHERE is_active = 1 ORDER BY category, display_order, name");
            $members = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $grouped = [];
            foreach ($members as $member) {
                $grouped[$member['category']][] = $member;
            }
            jsonResponse($grouped);
        }
    } elseif ($method === 'POST') {
        $data = getJsonInput();
        $stmt = $pdo->prepare("INSERT INTO team_members (name, designation, image_url, category, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['name'] ?? '',
            $data['designation'] ?? '',
            $data['image_url'] ?? '',
            $data['category'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1
        ]);
        jsonResponse(['id' => $pdo->lastInsertId(), 'message' => 'Team member created']);
    } elseif ($method === 'PUT' && $id) {
        $data = getJsonInput();
        $stmt = $pdo->prepare("UPDATE team_members SET name = ?, designation = ?, image_url = ?, category = ?, display_order = ?, is_active = ? WHERE id = ?");
        $stmt->execute([
            $data['name'] ?? '',
            $data['designation'] ?? '',
            $data['image_url'] ?? '',
            $data['category'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1,
            $id
        ]);
        jsonResponse(['message' => 'Team member updated']);
    } elseif ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM team_members WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse(['message' => 'Team member deleted']);
    }
}

function handleWebsites($method, $id) {
    global $pdo;
    
    if ($method === 'GET') {
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM website_portfolio WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            $item = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$item) {
                jsonResponse(['error' => 'Website not found'], 404);
            }
            jsonResponse($item);
        } else {
            $stmt = $pdo->query("SELECT * FROM website_portfolio WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC");
            jsonResponse($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    } elseif ($method === 'POST') {
        $data = getJsonInput();
        $stmt = $pdo->prepare("INSERT INTO website_portfolio (title, description, image_url, website_url, category, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['title'] ?? '',
            $data['description'] ?? '',
            $data['image_url'] ?? '',
            $data['website_url'] ?? '',
            $data['category'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1
        ]);
        jsonResponse(['id' => $pdo->lastInsertId(), 'message' => 'Website created']);
    } elseif ($method === 'PUT' && $id) {
        $data = getJsonInput();
        $stmt = $pdo->prepare("UPDATE website_portfolio SET title = ?, description = ?, image_url = ?, website_url = ?, category = ?, display_order = ?, is_active = ? WHERE id = ?");
        $stmt->execute([
            $data['title'] ?? '',
            $data['description'] ?? '',
            $data['image_url'] ?? '',
            $data['website_url'] ?? '',
            $data['category'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1,
            $id
        ]);
        jsonResponse(['message' => 'Website updated']);
    } elseif ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM website_portfolio WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse(['message' => 'Website deleted']);
    }
}

function handleLogos($method, $id) {
    global $pdo;
    
    if ($method === 'GET') {
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM logo_portfolio WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            $item = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$item) {
                jsonResponse(['error' => 'Logo not found'], 404);
            }
            jsonResponse($item);
        } else {
            $stmt = $pdo->query("SELECT * FROM logo_portfolio WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC");
            jsonResponse($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    } elseif ($method === 'POST') {
        $data = getJsonInput();
        $stmt = $pdo->prepare("INSERT INTO logo_portfolio (title, description, image_url, category, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['title'] ?? '',
            $data['description'] ?? '',
            $data['image_url'] ?? '',
            $data['category'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1
        ]);
        jsonResponse(['id' => $pdo->lastInsertId(), 'message' => 'Logo created']);
    } elseif ($method === 'PUT' && $id) {
        $data = getJsonInput();
        $stmt = $pdo->prepare("UPDATE logo_portfolio SET title = ?, description = ?, image_url = ?, category = ?, display_order = ?, is_active = ? WHERE id = ?");
        $stmt->execute([
            $data['title'] ?? '',
            $data['description'] ?? '',
            $data['image_url'] ?? '',
            $data['category'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1,
            $id
        ]);
        jsonResponse(['message' => 'Logo updated']);
    } elseif ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM logo_portfolio WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse(['message' => 'Logo deleted']);
    }
}

function handleGraphics($method, $id) {
    global $pdo;
    
    if ($method === 'GET') {
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM graphic_designs WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            $item = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$item) {
                jsonResponse(['error' => 'Graphic design not found'], 404);
            }
            jsonResponse($item);
        } else {
            $stmt = $pdo->query("SELECT * FROM graphic_designs WHERE is_active = 1 ORDER BY design_type, display_order ASC");
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $grouped = ['2D' => [], '3D' => []];
            foreach ($items as $item) {
                $type = strtoupper(trim($item['design_type']));
                if (isset($grouped[$type])) {
                    $grouped[$type][] = $item;
                }
            }
            jsonResponse($grouped);
        }
    } elseif ($method === 'POST') {
        $data = getJsonInput();
        $stmt = $pdo->prepare("INSERT INTO graphic_designs (title, description, image_url, thumbnail_url, category, design_type, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['title'] ?? '',
            $data['description'] ?? '',
            $data['image_url'] ?? '',
            $data['thumbnail_url'] ?? '',
            $data['category'] ?? '',
            $data['design_type'] ?? '2D',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1
        ]);
        jsonResponse(['id' => $pdo->lastInsertId(), 'message' => 'Graphic design created']);
    } elseif ($method === 'PUT' && $id) {
        $data = getJsonInput();
        $stmt = $pdo->prepare("UPDATE graphic_designs SET title = ?, description = ?, image_url = ?, thumbnail_url = ?, category = ?, design_type = ?, display_order = ?, is_active = ? WHERE id = ?");
        $stmt->execute([
            $data['title'] ?? '',
            $data['description'] ?? '',
            $data['image_url'] ?? '',
            $data['thumbnail_url'] ?? '',
            $data['category'] ?? '',
            $data['design_type'] ?? '2D',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1,
            $id
        ]);
        jsonResponse(['message' => 'Graphic design updated']);
    } elseif ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM graphic_designs WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse(['message' => 'Graphic design deleted']);
    }
}

function handleFlyers($method, $id) {
    global $pdo;
    
    if ($method === 'GET') {
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM flyers_posters WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            $item = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$item) {
                jsonResponse(['error' => 'Flyer/Poster not found'], 404);
            }
            jsonResponse($item);
        } else {
            $stmt = $pdo->query("SELECT * FROM flyers_posters WHERE is_active = 1 ORDER BY category, display_order ASC");
            jsonResponse($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    } elseif ($method === 'POST') {
        $data = getJsonInput();
        $stmt = $pdo->prepare("INSERT INTO flyers_posters (title, description, image_url, thumbnail_url, category, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['title'] ?? '',
            $data['description'] ?? '',
            $data['image_url'] ?? '',
            $data['thumbnail_url'] ?? '',
            $data['category'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1
        ]);
        jsonResponse(['id' => $pdo->lastInsertId(), 'message' => 'Flyer/Poster created']);
    } elseif ($method === 'PUT' && $id) {
        $data = getJsonInput();
        $stmt = $pdo->prepare("UPDATE flyers_posters SET title = ?, description = ?, image_url = ?, thumbnail_url = ?, category = ?, display_order = ?, is_active = ? WHERE id = ?");
        $stmt->execute([
            $data['title'] ?? '',
            $data['description'] ?? '',
            $data['image_url'] ?? '',
            $data['thumbnail_url'] ?? '',
            $data['category'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1,
            $id
        ]);
        jsonResponse(['message' => 'Flyer/Poster updated']);
    } elseif ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM flyers_posters WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse(['message' => 'Flyer/Poster deleted']);
    }
}

function handleUiux($method, $id) {
    global $pdo;
    
    if ($method === 'GET') {
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM uiux_designs WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            $item = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$item) {
                jsonResponse(['error' => 'UI/UX design not found'], 404);
            }
            jsonResponse($item);
        } else {
            $stmt = $pdo->query("SELECT * FROM uiux_designs WHERE is_active = 1 ORDER BY design_type, display_order ASC");
            jsonResponse($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    } elseif ($method === 'POST') {
        $data = getJsonInput();
        $stmt = $pdo->prepare("INSERT INTO uiux_designs (title, description, prototype_url, image_url, thumbnail_url, category, design_type, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['title'] ?? '',
            $data['description'] ?? '',
            $data['prototype_url'] ?? '',
            $data['image_url'] ?? '',
            $data['thumbnail_url'] ?? '',
            $data['category'] ?? '',
            $data['design_type'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1
        ]);
        jsonResponse(['id' => $pdo->lastInsertId(), 'message' => 'UI/UX design created']);
    } elseif ($method === 'PUT' && $id) {
        $data = getJsonInput();
        $stmt = $pdo->prepare("UPDATE uiux_designs SET title = ?, description = ?, prototype_url = ?, image_url = ?, thumbnail_url = ?, category = ?, design_type = ?, display_order = ?, is_active = ? WHERE id = ?");
        $stmt->execute([
            $data['title'] ?? '',
            $data['description'] ?? '',
            $data['prototype_url'] ?? '',
            $data['image_url'] ?? '',
            $data['thumbnail_url'] ?? '',
            $data['category'] ?? '',
            $data['design_type'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1,
            $id
        ]);
        jsonResponse(['message' => 'UI/UX design updated']);
    } elseif ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM uiux_designs WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse(['message' => 'UI/UX design deleted']);
    }
}

function handleVideos($method, $id) {
    global $pdo;
    
    if ($method === 'GET') {
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM portfolio_videos WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            $item = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$item) {
                jsonResponse(['error' => 'Video not found'], 404);
            }
            jsonResponse($item);
        } else {
            $stmt = $pdo->query("SELECT * FROM portfolio_videos WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC");
            jsonResponse($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    } elseif ($method === 'POST') {
        $data = getJsonInput();
        $stmt = $pdo->prepare("INSERT INTO portfolio_videos (title, description, video_file, thumbnail_file, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['title'] ?? '',
            $data['description'] ?? '',
            $data['video_file'] ?? '',
            $data['thumbnail_file'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1
        ]);
        jsonResponse(['id' => $pdo->lastInsertId(), 'message' => 'Video created']);
    } elseif ($method === 'PUT' && $id) {
        $data = getJsonInput();
        $stmt = $pdo->prepare("UPDATE portfolio_videos SET title = ?, description = ?, video_file = ?, thumbnail_file = ?, display_order = ?, is_active = ? WHERE id = ?");
        $stmt->execute([
            $data['title'] ?? '',
            $data['description'] ?? '',
            $data['video_file'] ?? '',
            $data['thumbnail_file'] ?? '',
            $data['display_order'] ?? 0,
            $data['is_active'] ?? 1,
            $id
        ]);
        jsonResponse(['message' => 'Video updated']);
    } elseif ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM portfolio_videos WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse(['message' => 'Video deleted']);
    }
}

function handleEnquiries($method, $id) {
    global $pdo;
    
    if ($method === 'GET') {
        $status = $_GET['status'] ?? null;
        $service = $_GET['service'] ?? null;
        $search = $_GET['search'] ?? null;
        
        $where = "1=1";
        $params = [];
        
        if ($status && $status !== 'all') {
            $where .= " AND status = ?";
            $params[] = $status;
        }
        if ($service && $service !== 'all') {
            $where .= " AND service_type = ?";
            $params[] = $service;
        }
        if ($search) {
            $where .= " AND (full_name LIKE ? OR email LIKE ? OR phone LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
        }
        
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM enquiries WHERE id = ?");
            $stmt->execute([$id]);
            $enquiry = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$enquiry) {
                jsonResponse(['error' => 'Enquiry not found'], 404);
            }
            jsonResponse($enquiry);
        } else {
            $stmt = $pdo->prepare("SELECT * FROM enquiries WHERE $where ORDER BY created_at DESC");
            $stmt->execute($params);
            jsonResponse($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
    } elseif ($method === 'POST') {
        $data = getJsonInput();
        
        if (empty($data['full_name']) || empty($data['email']) || empty($data['phone']) || 
            empty($data['service_type']) || empty($data['project_type']) || empty($data['project_description'])) {
            jsonResponse(['error' => 'Missing required fields'], 400);
        }
        
        $stmt = $pdo->prepare("INSERT INTO enquiries (full_name, email, phone, company, location, service_type, other_service, project_type, project_description, design_style, deadline, budget_range, contact_preference, best_time, hear_about, other_source, additional_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['full_name'] ?? '',
            $data['email'] ?? '',
            $data['phone'] ?? '',
            $data['company'] ?? null,
            $data['location'] ?? null,
            is_array($data['service_type']) ? implode(', ', $data['service_type']) : ($data['service_type'] ?? ''),
            $data['other_service'] ?? null,
            $data['project_type'] ?? '',
            $data['project_description'] ?? '',
            $data['design_style'] ?? null,
            $data['deadline'] ?? null,
            $data['budget_range'] ?? null,
            is_array($data['contact_preference']) ? implode(', ', $data['contact_preference']) : ($data['contact_preference'] ?? ''),
            $data['best_time'] ?? null,
            $data['hear_about'] ?? null,
            $data['other_source'] ?? null,
            $data['additional_notes'] ?? null
        ]);
        
        jsonResponse(['id' => $pdo->lastInsertId(), 'message' => 'Enquiry submitted successfully'], 201);
    } elseif ($method === 'PUT' && $id) {
        $data = getJsonInput();
        $stmt = $pdo->prepare("UPDATE enquiries SET status = ?, updated_at = NOW() WHERE id = ?");
        $stmt->execute([$data['status'] ?? 'pending', $id]);
        jsonResponse(['message' => 'Enquiry status updated']);
    } elseif ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM enquiries WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse(['message' => 'Enquiry deleted']);
    }
}

function handleAuth($method) {
    global $pdo;
    
    if ($method === 'POST') {
        $data = getJsonInput();
        $action = $data['action'] ?? '';
        
        if ($action === 'login') {
            $username = $data['username'] ?? '';
            $password = $data['password'] ?? '';
            
            if (empty($username) || empty($password)) {
                jsonResponse(['error' => 'Username and password required'], 400);
            }
            
            $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ? AND is_active = 1");
            $stmt->execute([$username]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user && password_verify($password, $user['password_hash'])) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $user['id'];
                $_SESSION['admin_username'] = $user['username'];
                
                $stmt = $pdo->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?");
                $stmt->execute([$user['id']]);
                
                jsonResponse([
                    'message' => 'Login successful',
                    'user' => [
                        'id' => $user['id'],
                        'username' => $user['username'],
                        'full_name' => $user['full_name']
                    ]
                ]);
            } else {
                jsonResponse(['error' => 'Invalid credentials'], 401);
            }
        } elseif ($action === 'logout') {
            session_unset();
            session_destroy();
            jsonResponse(['message' => 'Logged out successfully']);
        } elseif ($action === 'check') {
            if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
                jsonResponse(['authenticated' => true, 'user' => [
                    'id' => $_SESSION['admin_id'],
                    'username' => $_SESSION['admin_username']
                ]]);
            } else {
                jsonResponse(['authenticated' => false]);
            }
        }
    }
    
    jsonResponse(['error' => 'Invalid action'], 400);
}

function handleAdmin($method, $id) {
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }
    
    global $pdo;
    
    if ($method === 'GET') {
        $type = $_GET['type'] ?? 'stats';
        
        if ($type === 'stats') {
            $stats = [];
            
            $stmt = $pdo->query("SELECT COUNT(*) as total FROM enquiries");
            $stats['enquiries_total'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
            
            $stmt = $pdo->query("SELECT COUNT(*) as total FROM enquiries WHERE status = 'pending'");
            $stats['enquiries_pending'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
            
            $stmt = $pdo->query("SELECT COUNT(*) as total FROM carousel_slides WHERE is_active = 1");
            $stats['slides'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
            
            $stmt = $pdo->query("SELECT COUNT(*) as total FROM team_members WHERE is_active = 1");
            $stats['team_members'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
            
            $stmt = $pdo->query("SELECT COUNT(*) as total FROM website_portfolio WHERE is_active = 1");
            $stats['websites'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
            
            $stmt = $pdo->query("SELECT COUNT(*) as total FROM logo_portfolio WHERE is_active = 1");
            $stats['logos'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
            
            $stmt = $pdo->query("SELECT COUNT(*) as total FROM graphic_designs WHERE is_active = 1");
            $stats['graphics'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
            
            $stmt = $pdo->query("SELECT COUNT(*) as total FROM flyers_posters WHERE is_active = 1");
            $stats['flyers'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
            
            jsonResponse($stats);
        }
    }
    
    jsonResponse(['error' => 'Invalid request'], 400);
}

function handleUpload() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(['error' => 'Only POST method allowed'], 405);
    }
    
    if (!isset($_FILES['file'])) {
        jsonResponse(['error' => 'No file uploaded'], 400);
    }
    
    $file = $_FILES['file'];
    $type = $_POST['type'] ?? 'general';
    
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
    
    if (!in_array($file['type'], $allowedTypes)) {
        jsonResponse(['error' => 'File type not allowed'], 400);
    }
    
    $uploadDir = __DIR__ . '/uploads/';
    
    switch ($type) {
        case 'slides':
            $uploadDir .= 'carousel/';
            break;
        case 'team':
            $uploadDir .= 'team/';
            break;
        case 'websites':
            $uploadDir .= 'websites/';
            break;
        case 'logos':
            $uploadDir .= 'logos/';
            break;
        case 'graphics':
            $uploadDir .= 'graphics/';
            break;
        case 'flyers':
            $uploadDir .= 'flyers/';
            break;
        case 'uiux':
            $uploadDir .= 'uiux/';
            break;
        case 'videos':
            $uploadDir .= 'videos/';
            break;
        default:
            $uploadDir .= 'general/';
    }
    
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = time() . '_' . uniqid() . '.' . $extension;
    $targetPath = $uploadDir . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $fullPath = str_replace(__DIR__ . '/', '', $targetPath);
        
        jsonResponse([
            'message' => 'File uploaded successfully',
            'path' => $fullPath,
            'url' => $fullPath,
            'filename' => $filename
        ]);
    } else {
        jsonResponse(['error' => 'Failed to upload file'], 500);
    }
}
