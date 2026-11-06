<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

// Bootstrap Laravel kernel for request handling
$request = Illuminate\Http\Request::create('/', 'GET');
ob_start();
$response = $app->handleRequest($request);
$output = ob_get_clean();
$html = ($response && method_exists($response, 'getContent')) ? $response->getContent() : $output;

$distDir = __DIR__ . '/dist';
if (!is_dir($distDir)) {
    mkdir($distDir, 0755, true);
}

// Replace any localhost or absolute domains with relative paths
$html = str_replace(['http://localhost/', 'http://127.0.0.1:8000/', 'http://localhost'], ['/', '/', ''], $html);
$html = preg_replace('/http:\/\/localhost:\d+\//', '/', $html);
$html = preg_replace('/http:\/\/127\.0\.0\.1:\d+\//', '/', $html);

// Save index.html
file_put_contents($distDir . '/index.html', $html);
echo "✓ Generated dist/index.html (" . strlen($html) . " bytes)\n";

// 2. Recursive copy helper
function copyDir($src, $dst) {
    $dir = opendir($src);
    if (!is_dir($dst)) {
        mkdir($dst, 0755, true);
    }
    while (($file = readdir($dir)) !== false) {
        if ($file != '.' && $file != '..') {
            if (is_dir($src . '/' . $file)) {
                copyDir($src . '/' . $file, $dst . '/' . $file);
            } else {
                copy($src . '/' . $file, $dst . '/' . $file);
            }
        }
    }
    closedir($dir);
}

// 3. Copy public/build to dist/build
if (is_dir(__DIR__ . '/public/build')) {
    copyDir(__DIR__ . '/public/build', $distDir . '/build');
    echo "✓ Copied public/build to dist/build\n";
}

// 4. Generate static API endpoints for Netlify
$apiDir = $distDir . '/api/v1';
if (!is_dir($apiDir)) {
    mkdir($apiDir, 0755, true);
}

// /api/v1/health
file_put_contents($apiDir . '/health', json_encode([
    'status' => 'healthy',
    'runtime' => 'Netlify Edge / High-Performance CDN',
    'framework' => 'DQUAD Architecture v2.0',
    'environment' => 'production',
    'latency' => '< 15ms Global Edge',
    'timestamp' => date('c'),
], JSON_PRETTY_PRINT));

// /api/v1/profile
file_put_contents($apiDir . '/profile', json_encode([
    'developer' => 'Darun Naim Sindid',
    'alias' => 'DQUAD',
    'title' => 'Full-Stack Web Architect & Game Developer',
    'status' => 'Available for hire & co-op projects',
    'location' => 'Dhaka, Bangladesh',
    'comms' => [
        'email' => 'dquadofficialgg@gmail.com',
        'phone' => '01888574160',
        'github' => 'https://github.com/dquad90',
        'youtube' => 'https://www.youtube.com/@dquaddq',
    ],
    'attributes' => [
        'game_engineering' => 98,
        'full_stack_web' => 96,
        'native_android' => 92,
        'velocity' => 99,
    ],
], JSON_PRETTY_PRINT));

// /api/v1/stack
file_put_contents($apiDir . '/stack', json_encode([
    'core_languages' => ['PHP 8.4', 'C#', 'Kotlin', 'Java', 'JavaScript (ESNext)', 'GDScript'],
    'frameworks' => ['Laravel 13', 'Tailwind CSS v4', 'Unity 6', 'Godot 4', 'Android Studio'],
    'architecture' => ['Modular DDD / Clean MVC', 'RESTful JSON API', 'WebSockets', 'Web Audio API'],
    'database' => ['SQLite', 'PostgreSQL 16', 'Redis Cache'],
], JSON_PRETTY_PRINT));

echo "✓ Created static API mocks in dist/api/v1/\n";

// 5. Netlify _redirects file
$redirectsContent = "
# SPA Fallback
/*    /index.html   200
";
file_put_contents($distDir . '/_redirects', trim($redirectsContent) . "\n");
echo "✓ Created dist/_redirects\n";

// 6. Netlify _headers file for maximum performance
$headersContent = "
/*
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/api/v1/*
  Content-Type: application/json; charset=utf-8
  Access-Control-Allow-Origin: *

/build/assets/*
  Cache-Control: public, max-age=31536000, immutable
";
file_put_contents($distDir . '/_headers', trim($headersContent) . "\n");
echo "✓ Created dist/_headers\n";

echo "\n🎉 STATIC EXPORT COMPLETE! The 'dist' folder is ready for Netlify!\n";
