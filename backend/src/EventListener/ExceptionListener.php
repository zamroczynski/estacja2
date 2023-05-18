<?php

namespace App\EventListener;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ExceptionListener
{
    public function onKernelException(ExceptionEvent $event): void
    {
        if (
            $_ENV['APP_ENV'] != 'prod'
            || !$event->isMasterRequest()
            || !$event->getThrowable() instanceof NotFoundHttpException
        ) {
            return;
        }

        // Send a not found in JSON format
        $event->setResponse(new JsonResponse($this->translator->trans('not_found')));
    }
}