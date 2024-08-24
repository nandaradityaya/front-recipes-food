// untuk mengatur data, misal recipe itu menerima data yg di tulis di sini saja
// gunakan export agar bisa di gunakan di component react, jika tidak menggunakan export maka hanya bisa di gunakan di dalam type.ts saja

export interface Recipe {
  id: number;
  name: string;
  slug: string;
  url_file: string;
  url_video: string;
  author: Author;
  category: Category;
  thumbnail: string;
  photos: Photo[]; // kasih array karna data fotonya banyak (lebih dari 1)
  tutorials: Tutorial[];
  recipe_ingredients: RecipeIngredient[]; // pake array karna datanya akan leboh dari 1
  about: string;
}

interface Photo {
  id: number;
  photo: string;
}

interface Tutorial {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
  photo: string;
}

interface RecipeIngredient {
  id: number;
  ingredient: Ingredient;
}

interface Ingredient {
  id: number;
  name: string;
  photo: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  recipes_count: number;
  recipes: Recipe[];
}
