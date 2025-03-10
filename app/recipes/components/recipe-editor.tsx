import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
interface CommonProps {
    recip_id: string;
    fontsize?:string;
    type?:string;
}
type ConditionalProps =
  | {
      data: string;
      images: never;
    }
  | {
      data: never;
      images: File[];
    };

type displayProps = CommonProps & ConditionalProps

export default function RecipeEditor({recip_id, data, images, fontsize, type}:displayProps) {
    const [editing, setEditing] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>(data || "");

    const changeRecipe = async <T extends string | FileList>(recipPart:string, recipChange:T) => {
        try {
            const response = await fetch('/api/updateRecipe', {
                method: 'POST',
                body: JSON.stringify({ recipeID: recip_id, [recipPart]: recipChange }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error('Failed to update recipe');
            }
        } catch (error) {
            console.error("Error updating recipe: ", error);
        }
    }

    if (!editing) {
        return (
            <div className="group">
                {images ? (
                    <Image 
                        src={URL.createObjectURL(images[0])}
                        alt="Image"
                    />
                ): (
                    <div className="flex flex-col">
                        <h1>{type}</h1>
                        <p className={fontsize}>{data}</p>
                    </div>
                )}
                <Button variant="ghost" className="p-1" onClick={() => setEditing(true)}>
                    <Edit />
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                {images ? (
                <div className="flex flex-col gap-2">
                    <Input 
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files) {
                                changeRecipe("images", e.target.files);
                            }
                        }}
                        className="bg-gray-800 text-white border border-gray-700"
                    />
                </div>
                ): (
                    <div> 
                        <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-white text-black border border-gray-700 w-full p-2 rounded-md resize-y"
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = `${target.scrollHeight}px`;
                            }}
                        />
                    </div>
                )}
            </div>
        )   
    }

    

}