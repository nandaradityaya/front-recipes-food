import { useEffect, useState } from "react";
import RecipeCardResult from "../components/RecipeCardResult";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Category } from "../types/type";

export default function CategoryLatestRecipesWrapper() {
  const { slug } = useParams<{ slug: string }>(); // ambil parameter
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/category/${slug}`, {
        headers: {
          "X-API-KEY": "sdfasget843r34hf223hfdsf",
        },
      })
      .then((response) => {
        setCategory(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [slug]); // isi parameter kedua dengan array slug, artinya efek tersebut akan dijalankan setiap kali nilai slug berubah.

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error loading: {error}</p>;
  }
  if (!category) {
    return <p>Category not found</p>;
  }

  return (
    <section id="LatestRecipes" className="px-5 mt-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Latest Recipes</h2>
      </div>
      <div className="flex flex-col gap-[18px] mt-[18px]">
        {category.recipes.length > 0 ? (
          category.recipes.map((recipe) => (
            <Link to={`/recipe/${recipe.slug}`} key={recipe.id}>
              <RecipeCardResult recipe={recipe} />
            </Link>
          ))
        ) : (
          <p>Belum ada data terkait</p>
        )}
      </div>
    </section>
  );
}
