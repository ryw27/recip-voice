import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RecipeDisplay from "../components/recipe-display";
interface recipeData {
	recipeID: string; //uuid
	recipeName: string;
	Ingredients: string,
	Steps: string,
	Tips: string,
	EstimatedTime: string;
	recipeTags: string
	Images: File[] 
}
export default async function ID(props: {searchParams:Promise<string>}) {
		const recipe_id = await props.searchParams
		const supabase = await createClient();
		const {
				data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			return redirect("/sign-in");
		}
		//recipe should be correctly assigned to user
		const { data, error } = await supabase.
			from('recipes')
			.select('*')
			.eq('recipeID',recipe_id);
			
		if (error || data.length == 0) {
			return (
				<p className="w-full text-lg flex justify-content items-center">
					Recipe not found
				</p>
			)
		} else if (data.length > 0){
			const recipe: recipeData = data[0];

			return (
				<main className="flex flex-col gap-4">
					<RecipeDisplay data={recipe.recipeName} images={undefined as never}/>;
					<RecipeDisplay data={recipe.Ingredients} images={undefined as never}/>;
					<RecipeDisplay data={recipe.Steps} images={undefined as never}/>;
					<RecipeDisplay data={recipe.Tips} images={undefined as never}/>;
					<RecipeDisplay data={recipe.EstimatedTime} images={undefined as never}/>;
					<RecipeDisplay data={recipe.recipeTags} images={undefined as never}/>;
					<RecipeDisplay data={undefined as never} images={recipe.Images}/>;
				</main>
			)
		}

}