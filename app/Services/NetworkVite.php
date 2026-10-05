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

        try {
            $request = request();
            $requestHost = $request->getHost();
            $port = (int) $request->getPort();
            $scheme = $request->getScheme();

            // When accessed through the unified proxy (HTTPS 8443 or HTTP 8080)
            if ($port === 8443 || $port === 8080) {
                return "{$scheme}://{$requestHost}:{$port}";
            }

            // When accessed directly through Laravel (port 8000), point to Vite dev port 5173
            if ($port === 8000) {
                return "http://{$requestHost}:5173";
            }

            // Fallback for custom reverse proxies or other ports
            $portSuffix = ($port && ! in_array($port, [80, 443])) ? ":{$port}" : '';
            return "{$scheme}://{$requestHost}{$portSuffix}";
        } catch (\Throwable) {
            return $url;
        }
    }
}
