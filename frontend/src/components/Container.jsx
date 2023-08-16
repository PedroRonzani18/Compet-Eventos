const Container = ({ children }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-[1246px] px-[15px] mx-auto">
      {children}
    </div>
  );
};
export default Container;
