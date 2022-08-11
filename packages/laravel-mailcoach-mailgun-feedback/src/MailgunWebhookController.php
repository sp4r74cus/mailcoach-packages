<?php

namespace Spatie\MailcoachMailgunFeedback;

use Illuminate\Http\Request;
use Spatie\Mailcoach\Domain\Settings\Models\Mailer;
use Spatie\WebhookClient\WebhookProcessor;

class MailgunWebhookController
{
    public function __invoke(Request $request, ?string $mailer = null)
    {
        $this->registerMailerConfig($mailer);

        $webhookConfig = MailgunWebhookConfig::get();

        (new WebhookProcessor($request, $webhookConfig))->process();

        return response()->json(['message' => 'ok']);
    }

    public function registerMailerConfig(?string $mailer): void
    {
        if (! $mailer) {
            return;
        }

        $mailer = cache()->remember(
            "mailcoach-mailer-{$mailer}",
            now()->addMinute(),
            function () use ($mailer) {
                return Mailer::findByConfigKeyName($mailer);
            },
        );

        $mailer?->registerConfigValues();
    }
}
