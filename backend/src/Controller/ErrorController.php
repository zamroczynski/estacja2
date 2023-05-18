<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\ErrorHandler\Exception\FlattenException;

class ErrorController extends AbstractController
{
    #[Route('/error', name: 'app_error')]
    public function show(FlattenException $exception): JsonResponse
    {
        return $this->json([
            'code' => $exception->getStatusCode(),
            'message' => $exception->getStatusText()
        ]);
    }
}
