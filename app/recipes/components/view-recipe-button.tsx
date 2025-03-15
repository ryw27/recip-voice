'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ViewRecipeButtonProps {
    recipeId: string;
}

export default function ViewRecipeButton({ recipeId }: ViewRecipeButtonProps) {
    const router = useRouter();
    return <Button onClick={() => router.push(`/recipes/${recipeId}`)}>View Recipe</Button>;
} 