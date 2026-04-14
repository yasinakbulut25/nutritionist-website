function TitleWithDesc({
  as: Component = "h2",
  title,
  subTitle,
  desc,
  className = "",
}) {
  return (
    <div className="text-center mb-12">
      <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider mb-3 block">
        {subTitle}
      </span>
      <Component
        className={`text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 text-pretty ${className}`}
      >
        {title}
      </Component>
      <p className="text-slate-600 md:text-lg text-base max-w-2xl mx-auto text-pretty">
        {desc}
      </p>
    </div>
  );
}

export default TitleWithDesc;
