import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RecipeCard from "./components/recipe-card";
import SearchBar from "./components/search-bar";

interface recipeSearchParams {
    name?: string;  
    tags?: string;
}

export default async function Recipes(props: {searchParams: Promise<recipeSearchParams>}) {
    const { name, tags } = await props.searchParams;
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    // const { data, error } = await supabase
        // .from('recipes')
        // .select('*')
        // .eq('user_id', user.id)
    const getQuery = async () => {
        const query = supabase
            .from('recipes')
            .select('*')
            .eq('user_id', user.id)

        if (name) {
            query.ilike('name', `%${name || ''}%`) 
        }
        if (tags) {
            const tagArray = tags.split(',');
            query.in('recipe_tags', tagArray || []); 
        }
        return query;
    }

    const { data, error } = await getQuery();
    if (error) {
        console.error(`Error fetching recipes: ${error.message}`);
        return null;
    }

    const getTags = async () => {
        // const { data, error } = await supabase
        //     .from('tags')
        //     .select('*')
        //     .eq('user_id', user.id);
        // if (error) {
        //     console.error(`Error fetching tags: ${error}`);
        // }

        // return data?.map(tag => tag.name) || []
        return ["hi"] //for now
    }

    const handleView = (id: string) => {
        redirect(`/recipes/${id}`);
    }


    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="w-full max-w-6xl mx-auto">
                <SearchBar availableTags={getTags()}/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">  
                    {data?.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} onView={handleView} />
                    ))}
                </div>
            </div>
        </div>
    );
}