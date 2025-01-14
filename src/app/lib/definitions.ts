export type User = {
    id : string;
    username : string;
    email : string;
    password : string;
}

export type Recipe = {
    id : string;
    image_url : string;
    title : string;
    time : number;
    ingredients : string[],
    instructions: string[]
    tips : string[],
    categories : string[]
    
}