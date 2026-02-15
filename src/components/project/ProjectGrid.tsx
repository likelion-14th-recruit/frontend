// components/project/ProjectGrid.tsx
import ProjectCard from "./ProjectCard";
import ProjectSkeletonCard from "./ProjectSkeletonCard";

interface Post {
  imageUrl: string;
  name: string;
  description: string;
  instagramUrl: string;
}

interface ProjectGridProps {
  projects: Post[];
  isLoading: boolean;
}

const ProjectGrid = ({ projects, isLoading }: ProjectGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="       
        grid 
        grid-cols-1
        md:grid-cols-2
        desktop:grid-cols-3 
        gap-[24px]">
          {Array.from({ length: 15 }).map((_, i) => (
            <ProjectSkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center overflow-x-hidden
      mb-[40px]
      md:mb-[120px]
    ">
      <div className="
        grid 
        grid-cols-1
        md:grid-cols-2
        desktop:grid-cols-3 
        gap-[24px]
        ">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            imageUrl={project.imageUrl}
            name={project.name}
            description={project.description}
            linkUrl={project.instagramUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
