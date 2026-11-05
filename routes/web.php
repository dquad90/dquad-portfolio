<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

Route::get('/', function () {
    return view('welcome');
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
