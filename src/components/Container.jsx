const Container = ({ children, id = "", className = "" }) => {
  return (
    <section
      id={id}
      className={`w-full max-w-6xl mx-auto px-4 sm:pt-20 pt-10 ${className}`}
    >
      {children}
    </section>
  );
};

export default Container;
