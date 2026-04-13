function Title({ as: Component = "h2", children, className = "", ...rest }) {
  return (
    <Component
      className={`relative w-max lg:text-5xl md:text-4xl text-2xl font-bold bg-gradient-to-br from-violet-900 via-violet-400 to-violet-900 bg-clip-text text-transparent text-left text-pretty mb-4 z-10 ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Title;
