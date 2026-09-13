import Link from "next/link";
import ProjectTemplate from "@/components/Work/ProjectTemplate";
import ViewMoreButton from "@/components/Home/ViewMoreButton";
import { Projects } from "@/data/projects";

const HomeProjects = () => {
  const featured = Projects.slice(0, 4);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4">
      <Link
        href="/work"
        className="jap text-3xl mb-4 block hover:opacity-80 transition-opacity"
      >
        Works
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {featured.map((project, index) => (
          <ProjectTemplate
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            github={project.github}
            link={project.link}
            stack={project.stack}
          />
        ))}
      </div>
      <div className="w-full flex justify-center mt-6">
        <ViewMoreButton href="/work" label="View More" />
      </div>
    </div>
  );
};

export default HomeProjects;
