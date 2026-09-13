import Cd from "@/components/Miscellaneous/Cd";
import GridBackground from "@/components/Blog/GridBackground";
import ComingSoon from "@/components/Blog/ComingSoon";

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-[70vh] px-4">
      {/* Main Content Container - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <ComingSoon
          title="Coming Soon"
          subtitle="Blog is under construction."
        />
      </div>

      {/* Terminal-style cd.. navigation */}
      <Cd />

      {/* Decorative Background */}
      <GridBackground />
    </div>
  );
}
