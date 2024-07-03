import Header from "../components/Header";


const Layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
