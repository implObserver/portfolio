export const SkillsSection = () => {
    return (
        <section className="mx-auto px-4 py-8 text-white">
            <div className="space-y-6">
                {/* ОС */}
                <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">ОС:</h3>
                    <div className="flex flex-wrap gap-3">
                        <img
                            src="https://skillicons.dev/icons?i=ubuntu"
                            alt="Ubuntu"
                            className="h-12 hover:scale-110 transition-transform"
                            title="Ubuntu"
                        />
                    </div>
                </div>

                {/* Языки */}
                <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">Языки:</h3>
                    <div className="flex flex-wrap gap-3">
                        {["html", "css", "js", "ts"].map((icon) => (
                            <img
                                key={icon}
                                src={`https://skillicons.dev/icons?i=${icon}`}
                                alt={icon}
                                className="h-12 hover:scale-110 transition-transform"
                                title={icon.toUpperCase()}
                            />
                        ))}
                    </div>
                </div>

                {/* Frontend */}
                <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">Frontend:</h3>
                    <div className="flex flex-wrap gap-3">
                        {["react", "redux", "nextjs", "tailwindcss"].map((icon) => (
                            <img
                                key={icon}
                                src={`https://skillicons.dev/icons?i=${icon}`}
                                alt={icon}
                                className="h-12 hover:scale-110 transition-transform"
                                title={icon === "nextjs" ? "Next.js" : icon.charAt(0).toUpperCase() + icon.slice(1)}
                            />
                        ))}
                        <img
                            src="https://github.com/user-attachments/assets/09d0fff7-3c29-4bd5-a299-c9b6a2d00c75"
                            alt="mobx"
                            className="h-12 hover:scale-110 transition-transform"
                            title="MobX"
                        />
                    </div>
                </div>

                {/* Backend */}
                <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">Backend:</h3>
                    <div className="flex flex-wrap gap-3">
                        {["nodejs", "express", "mongodb", "postgresql", "prisma"].map((icon) => (
                            <img
                                key={icon}
                                src={`https://skillicons.dev/icons?i=${icon}`}
                                alt={icon}
                                className="h-12 hover:scale-110 transition-transform"
                                title={icon === "nodejs" ? "Node.js" : icon.charAt(0).toUpperCase() + icon.slice(1)}
                            />
                        ))}
                    </div>
                </div>

                {/* Инструменты */}
                <div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">Инструменты:</h3>
                    <div className="flex flex-wrap gap-3">
                        {["git", "github", "vscode", "postman"].map((icon) => (
                            <img
                                key={icon}
                                src={`https://skillicons.dev/icons?i=${icon}`}
                                alt={icon}
                                className="h-12 hover:scale-110 transition-transform"
                                title={icon === "vscode" ? "VS Code" : icon.charAt(0).toUpperCase() + icon.slice(1)}
                            />
                        ))}
                    </div>
                </div>

                {/* GitHub статистика */}
                <div className="pt-4">
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">GitHub статистика:</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <img
                            src="https://github-readme-stats.vercel.app/api/top-langs/?username=implObserver&layout=compact&theme=github_dark_dimmed"
                            alt="Top Languages"
                            className="rounded-lg bg-gray-100 dark:bg-gray-800 p-2"
                        />
                    </div>
                </div>

                <h2 className="text-3xl font-bold mb-8 dark:text-white">Вадим Сергеевич</h2>
            </div>
        </section>
    );
};