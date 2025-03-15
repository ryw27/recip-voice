import  { redirect } from 'next/navigation';
import RecipeEditor from './recipe-editor';
import { createClient } from '@/utils/supabase/server';


interface CommonProps {
    recip_id: string;
    type: string;
}
type ConditionalProps =
  | {
      recip_data: string;
      images: never;
    }
  | {
      recip_data: never;
      images: File[];
    };

type displayProps = CommonProps & ConditionalProps

export default async function RecipeDisplay({ recip_id, type, recip_data, images }: displayProps) {
    const supabase = await createClient();
    const {
        data: { user }, 
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const fontsize: Record<string, string> = {
        "recipeName": "text-lg",
        "ingredients": "text-md",
        "steps": "text-sm",
        "tips": "text-xs",
        "estimatedTime": "text-xs",
        "recipeTags": "text-xs"
    };
    console.log(type, recip_data, images);
    if (images) {
        return (
            <main>  
                <div className="container mx-auto w-3/4">
                    <RecipeEditor 
                        recip_id={recip_id}
                        data={undefined as never}
                        images={images}
                    />
                </div>
            </main>
        )
    } else {
        return (
            <main>
                <div className="container mx-auto w-3/4 my-2"> 
                    <RecipeEditor 
                        recip_id={recip_id}
                        data={recip_data}
                        images={undefined as never}
                        fontsize={fontsize.type}
                        type={type}
                    />
                    {/* <p className={fontsize.type}>{data}</p> */}
                </div> 
            </main>
        )
    }

}