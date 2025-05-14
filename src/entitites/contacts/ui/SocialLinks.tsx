export const SocialLinks = () => {
  return (
    <div className="flex gap-4">
      {/* GitHub */}
      <a 
        href="https://github.com/implObserver" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group"
      >
        <img
          src="https://skillicons.dev/icons?i=github"
          alt="GitHub"
          className="h-20 transition-all duration-300 group-hover:scale-110 group-hover:opacity-90"
          title="Мой GitHub"
        />
      </a>

      {/* Gmail */}
      <a 
        href="mailto:prognozman1993@gmail.com" 
        className="group"
      >
        <img
          src="https://skillicons.dev/icons?i=gmail"
          alt="Gmail"
          className="h-20 transition-all duration-300 group-hover:scale-110 group-hover:opacity-90"
          title="Написать на почту"
        />
      </a>
    </div>
  );
};