import "./category-item.styles.scss";

const CategoryItem = ({ propsKategori }) => {
  const { imageUrl, title } = propsKategori;
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Jetzt Kaufen</p>
      </div>
    </div>
  );
};

export default CategoryItem;
