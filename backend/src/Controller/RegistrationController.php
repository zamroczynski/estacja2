<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;

#[Route('/api', name: 'api_')]

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function index(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $em = $doctrine->getManager();
        $decoded = json_decode($request->getContent());
        $username = $decoded->username;
        $plainTextPassword = $decoded->password;
        $firstName = $decoded->firstName;
        $lastName = $decoded->lastName;
        $role = $decoded->role;
        $email = $decoded->email;
        $phone = $decoded->phone;
        $active = true;

        $user = new User();
        $hashedPassword = $passwordHasher->hashPassword($user, $plainTextPassword);
        $user->setPassword($hashedPassword);
        $user->setUsername($username);
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setRoles($role);
        $user->setEmail($email);
        $user->setPhone($phone);
        $user->setActive($active);
        $em->persist($user);
        $em->flush();

        return $this->json([
            'message' => 'Nowe konto zostało utworzone!',
        ]);
    }
}