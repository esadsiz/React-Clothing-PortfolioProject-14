import Directory from "./components/directory/directory.component";

const App = () => {
  const kategoriler = [
    {
      id: 1,
      title: "Basecaps",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 2,
      title: "Jacken",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: 3,
      title: "Schuhe",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      id: 4,
      title: "Damen",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    },
    {
      id: 5,
      title: "Herren",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    },
  ];

  return <Directory propsKategoriler={kategoriler} />;
};

export default App;

// terminale npm install -g sass yazarak sass'i yüklemis olduk.
