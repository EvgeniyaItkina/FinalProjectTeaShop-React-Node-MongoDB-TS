import { ItemList } from "../components/ItemList/ItemList";
import { MainLayout } from "../layouts/MainLayout";

export const Home: React.FC = () => {
  return (
    <MainLayout>
      <ItemList onlyFavorites={false} />
    </MainLayout>
  );
};