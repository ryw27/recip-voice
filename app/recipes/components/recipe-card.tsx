import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import ViewRecipeButton from "./view-recipe-button";

interface RecipeCardProps {
    recipe: {
        id: string;
        recipename: string;
        description: string;
        ingredients: string;
        steps: string;
        tips: string;
        estimatedTime: string;
        recipeTags: string;
        images: string[];
    };
}



export default function RecipeCard({ recipe }: RecipeCardProps) {
    console.log(recipe);
    return (
        <Card>
            <CardHeader>
                {recipe.images && recipe.images.length > 0 && (
                    <div className="w-full h-48 relative mb-4">
                        <img 
                            src={recipe.images[0]}
                            alt={recipe.recipename}
                            className="object-cover w-full h-full rounded-t-lg"
                        />
                    </div>
                )}
                <CardTitle>{recipe.recipename}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{recipe.description}</p>
            </CardContent>
            <CardFooter>
                <ViewRecipeButton recipeId={recipe.id} />
            </CardFooter>
        </Card>
    )
}
