import Introduction from "@/components/Home/Introduction";
import BentoGrid from "@/components/Home/BentoGrid";
// import CertificateCarousel from "@/components/Home/CertificateCarousel";
// import Timeline from "@/components/Home/Timeline";
import HomeProjects from "@/components/Home/HomeProjects";
// import HomeBlogs from "@/components/Home/HomeBlogs";
import HomeSkills from "@/components/Home/HomeSkills";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <Introduction name={"Ashish"} />
      <BentoGrid />
      <HomeSkills />
      <HomeProjects />
      {/* <HomeBlogs /> */}
      {/* <CertificateCarousel urls={certificates} /> */}
      {/* <Timeline /> */}
    </div>
  );
}
