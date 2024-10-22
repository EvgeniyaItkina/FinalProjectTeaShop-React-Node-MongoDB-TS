import { ItemList } from "../components/ItemList/ItemList";
import { MainLayout } from "../layouts/MainLayout";

export const Favorites: React.FC = () => {
  return (
    <MainLayout>
      <ItemList onlyFavorites={true}/>
    </MainLayout>
  );
};