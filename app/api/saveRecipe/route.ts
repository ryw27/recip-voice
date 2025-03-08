import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
    const { recipeData } = await request.json();
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    // Validate required recipe fields
    if (!recipeData.recipeName || !recipeData.Ingredients || !recipeData.Steps) {
        return NextResponse.json({error: "Missing required recipe fields"}, {status: 400});
    }

    // Prepare recipe data with user ID
    const recipeToInsert = {
        user_id: user.id,
        name: recipeData.recipeName,
        ingredients: recipeData.Ingredients,
        steps: recipeData.Steps,
        tips: recipeData.Tips || '',
        estimated_time: recipeData.EstimatedTime || '',
        tags: recipeData.recipeTags || '',
        created_at: new Date().toISOString()
    };

    // Insert into Supabase
    const { data, error } = await supabase
        .from('recipes')
        .insert(recipeToInsert)
        .select()
        .single();

    if (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }

    return NextResponse.json({data: data});
    // old compare to compare
    if (!recipeData) {
        return NextResponse.json({error: "No recipe provided"}, {status: 400});
    }
    
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('recipes')
            .insert(recipeData);
        if (error) {
            alert(error);
            return NextResponse.json({error: "Error in inserting recipe"}, {status: 500})
        }
        return NextResponse.json({data : data});
    } catch (error) {
        return NextResponse.json({error: "Error in inserting recipe"}, {status: 500})
    }
}