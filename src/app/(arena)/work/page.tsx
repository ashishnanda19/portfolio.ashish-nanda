import ProjectTemplate from "@/components/Work/ProjectTemplate";
import Cd from "@/components/Miscellaneous/Cd";
import { Projects } from "@/data/projects";

function WorkPage() {
  return (
    <div className="flex flex-col min-h-[70vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        {Projects.map((project, index) => (
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
      <Cd />
    </div>
  );
}

export default WorkPage;
