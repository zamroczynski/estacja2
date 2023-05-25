<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Psr\Log\LoggerInterface;

#[Route('/api', name: 'api_')]

class UserController extends AbstractController
{
    #[Route('/user', name: 'user_all', methods: ['GET'])]
    public function index(EntityManagerInterface $doctrine): JsonResponse
    {
        $users = $doctrine->getRepository(User::class)->findAll();
        $data = [];
        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'role' => $user->getRoles(),
                'email' => $user->getEmail(),
                'phone' => $user->getPhone(),
                'activate' => $user->isActive()
            ];
        }
        return $this->json($data);
    }

    #[Route('/user/{id}', name: 'user_get', methods: ['GET'])]
    public function show(EntityManagerInterface $doctrine, int $id): JsonResponse
    {
        $user = $doctrine->getRepository(User::class)->find($id);
        $data[] = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'role' => $user->getRoles(),
            'email' => $user->getEmail(),
            'phone' => $user->getPhone(),
            'active' => $user->isActive()
        ];
        return $this->json($data);
    }

    #[Route('/user/{id}', name: 'user_edit', methods: ['PUT'])]
    public function edit(EntityManagerInterface $doctrine, int $id, Request $request, LoggerInterface $logger): JsonResponse
    {
        $user = $doctrine->getRepository(User::class)->find($id);
        if (!$user) {
            return $this->json([
                'code' => 404,
                'message' => "Brak konta o takim ID"
            ]);
        }
        try {
            $payload = json_decode($request->getContent(), true);
            $user->setFirstName($payload['firstName']);
            $user->setLastName($payload['lastName']);
            $user->setRoles($payload['role']);
            $user->setEmail($payload['email']);
            $user->setPhone($payload['phone']);
            $user->setActive($payload['activate']);
            $doctrine->persist($user);
            $doctrine->flush();
            $logger->info('UserID: {id} has been updated', ['id' => $id]);
            return $this->json([
                'code' => 200,
                'message' => 'Konto zostało zaktualizowane!'
            ]);
        } catch (Exception $e) {
            $logger->error("Error in UserController: {message}", ["message" => $e->getMessage()]);
            return $this->json([
                'code' => 500,
                'message' => 'Błąd podczas aktualizacji konta!'
            ]);
        }
    }

    #[Route('/user/{id}', name: 'user_deactivate', methods: ['DELETE'])]
    public function deactivate(EntityManagerInterface $doctrine, int $id, LoggerInterface $logger): JsonResponse
    {
        $user = $doctrine->getRepository(User::class)->find($id);
        if (!$user) {
            return $this->json([
                'code' => 404,
                'message' => "Brak konta o takim ID"
            ]);
        }
        try {
            $userIsActive = $user->isActive();
            $user->setActive(!$userIsActive);
            $doctrine->persist($user);
            $doctrine->flush();
            $logger->info('UserID: {id} has been deactivate', ['id' => $id]);
            return $this->json([
                'code' => 200,
                'message' => 'Konto zostało zaktualizowane!'
            ]);
        } catch (Exception $e) {
            $logger->error("Error in UserController: {message}", ["message" => $e->getMessage()]);
            return $this->json([
                'code' => 500,
                'message' => 'Błąd podczas aktualizacji konta!'
            ]);
        }
    }
}
