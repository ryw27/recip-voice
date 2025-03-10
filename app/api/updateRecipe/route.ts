import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
export async function POST(request: NextRequest) {
    const updates = await request.json();
    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({error: 'user not logged in'}, { status: 500 });
    }
    const { recipeID, ...updateFields } = updates;     

    const { data, error } = await supabase
        .from('recipes')
        .update(updateFields)
        .eq('recipeID', recipeID);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
        
}