import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";

const Directory = ({ propsKategoriler }) => {
  return (
    <div className="directory-container">
      {propsKategoriler.map((kategori) => (
        <CategoryItem key={kategori.id} propsKategori={kategori} />
      ))}
    </div>
  );
};

export default Directory;
