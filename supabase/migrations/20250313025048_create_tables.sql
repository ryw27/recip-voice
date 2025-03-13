--GLOBAL TABLES--
create table ingredients (
    id uuid primary key default gen_random_uuid(),
    name text unique not null,
    created_at timestamp with time zone default current_timestamp
);

create table tags (
    id uuid primary key default gen_random_uuid(),
    name text unique not null,
    created_at timestamp with time zone default current_timestamp
);
--GLOBAL TABLES--


--USER TABLES--
create table profiles ( 
    id uuid references auth.users primary key,
    username text unique,
    numRecipes int default 0,
    created_at timestamp with time zone default current_timestamp
);

create table recipes (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users,
    recipeName text not null,
    steps text not null,
    estimatedTime int,
    description text,
    servings int,
    tips text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp 
);

create table recipe_images (
    id uuid primary key default gen_random_uuid(),
    recipe_id uuid references recipes on delete cascade,
    image_url text not null,
    is_primary boolean default false,
    created_at timestamp with time zone default current_timestamp
);

create table recipe_tags (
    recipe_id uuid references recipes on delete cascade,
    tag_id uuid references tags,
    primary key (recipe_id, tag_id)
);

create table recipe_ingredients (
    recipe_id uuid references recipes on delete cascade, 
    ingredient_id uuid references ingredients,
    amount decimal,
    unit text,
    primary key (recipe_id, ingredient_id)
);





