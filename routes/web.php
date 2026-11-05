<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

Route::get('/', function () {
    return view('welcome');
});

// ==========================================
// DQUAD PORTFOLIO PUBLIC REST API (v1)
// ==========================================

Route::get('/api/v1/health', function () {
    return response()->json([
        'status' => 'healthy',
        'runtime' => 'PHP ' . PHP_VERSION . ' (JIT Active)',
        'framework' => 'Laravel ' . app()->version(),
        'environment' => app()->environment(),
        'memory_usage' => round(memory_get_usage(true) / 1024 / 1024, 2) . ' MB',
        'server_time' => now()->toIso8601String(),
    ]);
});

Route::get('/api/v1/profile', function () {
    return response()->json([
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
    ]);
});

Route::get('/api/v1/stack', function () {
    return response()->json([
        'core_languages' => ['PHP 8.4', 'C#', 'Kotlin', 'Java', 'JavaScript (ESNext)', 'GDScript'],
        'frameworks' => ['Laravel 13', 'Tailwind CSS v4', 'Unity 6', 'Godot 4', 'Android Studio'],
        'architecture' => ['Modular DDD / Clean MVC', 'RESTful JSON API', 'WebSockets', 'Web Audio API'],
        'database' => ['SQLite', 'PostgreSQL 16', 'Redis Cache'],
    ]);
});

Route::post('/api/transmission', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email',
        'message' => 'required|string|min:2',
    ]);

    $recipient = 'dquadofficialgg@gmail.com';
    $senderEmail = $validated['email'];
    $briefingMessage = $validated['message'];
    $subject = "[DQUAD Mission Briefing] Project Transmission from " . $senderEmail;

    // Log the transmission dispatch securely
    Log::info("TRANSMISSION_DISPATCH [{$senderEmail} -> {$recipient}]: " . substr($briefingMessage, 0, 300));

    // Attempt to dispatch via Laravel Mailer if driver is active
    $mailSent = false;
    try {
        Mail::raw(
            "DQUAD MISSION BRIEFING TRANSMISSION\n\n" .
            "Sender: {$senderEmail}\n" .
            "Timestamp: " . now()->toRfc2822String() . "\n" .
            "Gateway: Dhaka Node [TLS 1.3]\n\n" .
            "================ BRIEFING MESSAGE ================\n\n" .
            $briefingMessage . "\n\n" .
            "==================================================\n" .
            "Portfolio: DQUAD Cybernetic Command (portfolio v2.0)",
            function ($message) use ($recipient, $senderEmail, $subject) {
                $message->to($recipient)
                        ->replyTo($senderEmail)
                        ->subject($subject);
            }
        );
        $mailSent = true;
    } catch (\Throwable $e) {
        Log::warning("Transmission Mail::raw dispatch fallback: " . $e->getMessage());
    }

    return response()->json([
        'status' => 'success',
        'message' => 'Mission Briefing successfully encrypted and dispatched to operator gateway.',
        'recipient' => $recipient,
        'sender' => $senderEmail,
        'mail_sent' => $mailSent,
        'timestamp' => now()->toIso8601String(),
    ]);
});
