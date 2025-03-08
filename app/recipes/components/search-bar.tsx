'use client';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SearchBar(props:{availableTags:Promise<string[]>}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('name') || '');
    const [selectedTags, setSelectedTags] = useState<string[]>(
        searchParams.get('tags')?.split(',') || []
    );

    const [tags, setTags] = useState<string[]>([]);
    const [loadingTags, setLoadingTags] = useState<boolean>(true);

    useEffect(() => {
        const loadTags = async () => {
            try {
                const availableTags = await props.availableTags;
                setTags(availableTags || []);
            } catch (error) {
                alert(`Failed to obtain tags: ${error}`);
                setTags([])
            } finally {
                setLoadingTags(false);
            }
        };
        loadTags();
    },[])

    const handleUpdate = () => {
        const params = new URLSearchParams();
        if (searchTerm.trim()) {
            params.set('name',searchTerm.trim());
        }  

        const newURL = params.toString();
        router.push(`/recipes?${newURL}`);

    };

    const handleTagToggle = (newTag: string) => {
        const newTags = selectedTags.includes(newTag) ? 
            selectedTags.filter(tag => tag !== newTag) : [...selectedTags, newTag]
        
        setSelectedTags(newTags);
        const params = new URLSearchParams();
        if (selectedTags.length > 0) {
            params.set('tags', selectedTags.join(','));
        }

        const newURL = params.toString();
        router.push(`/recipes?${newURL}`);
    }; 
    
    return (
        <div className="flex items-center gap-2 w-full">
            <div className="flex-grow"> {/* search bar */}
                <Input 
                    className="w-full" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleUpdate();
                        }
                    }}
                />

            </div>
            <DropdownMenu> {/* filter tags dropdown */}
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        Tags ({selectedTags.length})
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {loadingTags ? (
                        <DropdownMenuItem disabled>
                            Loading tags...
                        </DropdownMenuItem>
                    ) : tags.map((tag) => (
                        <DropdownMenuItem
                            key={tag}
                            onClick={() => handleTagToggle(tag)}
                        >
                            <Input
                                type="checkbox"
                                checked={selectedTags.includes(tag)}
                                readOnly
                                className="mr-2 w-4 h-4"
                            />
                            {tag}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={handleUpdate}>
                <Search />
            </Button>
        </div>
    )
}