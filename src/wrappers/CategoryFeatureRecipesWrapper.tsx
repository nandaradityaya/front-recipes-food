import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import FeatureRecipeCard from "../components/FeatureRecipeCard";
import { Category } from "../types/type";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function CategoryFeatureRecipesWrapper() {
  const { slug } = useParams<{ slug: string }>(); // ambil parameter
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/category/${slug}`)
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
    <section id="MadeByPeople" className="mt-[30px]">
      <div className="flex items-center justify-between px-5">
        <h2 className="font-bold">Made by People</h2>
        <a
          href="#"
          className="font-semibold text-sm leading-[21px] text-[#FF4C1C]"
        >
          Explore All
        </a>
      </div>
      <div className="swiper w-full mt-3">
        <Swiper
          className="w-full mt-3"
          direction="horizontal"
          spaceBetween={16}
          slidesPerView="auto"
          slidesOffsetBefore={20} // atur padding
          slidesOffsetAfter={20} // atur padding
        >
          {/* ambil category dan masuk ke relasinya yaitu recipes */}
          {category.recipes.length > 0 ? (
            category.recipes.map((recipe) => (
              <SwiperSlide key={recipe.id} className="!w-fit">
                <Link to={`/recipe/${recipe.slug}`}>
                  <FeatureRecipeCard recipe={recipe} />
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <p>Belum ada data recipes dari kategor berikut</p>
          )}
        </Swiper>
      </div>
    </section>
  );
}
