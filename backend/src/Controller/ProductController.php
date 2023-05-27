<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Product;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;


#[Route('/api', name: 'api_')]

class ProductController extends AbstractController
{
    #[Route('/product', name: 'product_all', methods: ['GET'])]
    public function index(EntityManagerInterface $doctrine): JsonResponse
    {
        $products = $doctrine->getRepository(Product::class)->findAll();
        $data = [];
        foreach ($products as $product) {
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'createdBy' => $product->getCreatedBy(),
                'updatedBy' => $product->getUpdatedBy(),
                'createdAt' => $product->getCreatedAt(),
                'updatedAt' => $product->getUpdatedAt()
            ];
        }
        return $this->json($data);
    }

    #[Route('/product/{id}', name: 'product_get', methods: ['GET'])]
    public function show(EntityManagerInterface $doctrine, int $id): JsonResponse
    {
        $product = $doctrine->getRepository(Product::class)->find($id);
        $data = [];
        $data[] = [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'createdBy' => $product->getCreatedBy(),
            'updatedBy' => $product->getUpdatedBy(),
            'createdAt' => $product->getCreatedAt(),
            'updatedAt' => $product->getUpdatedAt()
        ];
        return $this->json($data);
    }

    #[Route('/product', name: 'product_create', methods: ['POST'])]
    public function create(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $em = $doctrine->getManager();
        $decoded = json_decode($request->getContent());
        $name = $decoded->name;
        $createdBy = $decoded->createdBy;
        $updatedBy = $decoded->createdBy;


        return $this->json([]);
    }
}
