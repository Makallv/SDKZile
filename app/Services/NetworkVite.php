<?php

namespace App\Services;

use Illuminate\Foundation\Vite as BaseVite;

/**
 * Custom Vite service that dynamically binds the dev server URL to the incoming
 * HTTP request's host address (e.g. LAN IP 10.90.0.50, 192.168.x.x, or localhost).
 *
 * When accessed through the HTTPS proxy (port 8443), it routes all Vite assets
 * through the SAME HTTPS port 8443. This completely eliminates cross-port
 * certificate blocking in modern mobile and desktop browsers (Chrome/Edge/Safari).
 */
class NetworkVite extends BaseVite
{
    public function devServerUrl()
    {
        $url = parent::devServerUrl();
        if (! $url) {
            return null;
        }

        // If using Herd Valet (.test) or hotFile already points to the site domain, preserve it
        if (str_contains($url, '.test')) {
            return $url;
        }

        // For LAN or local network access, dynamically use the request host with the Vite dev port
        $requestHost = request()->getHost();
        $parsed = parse_url($url);
        $scheme = $parsed['scheme'] ?? 'http';
        $port = isset($parsed['port']) ? ':'.$parsed['port'] : ':5173';
        return "{$scheme}://{$requestHost}{$port}";
    }
}
