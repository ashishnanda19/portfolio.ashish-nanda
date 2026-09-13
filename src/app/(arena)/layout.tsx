import Navbar from "@/components/Nav/Navbar";
import Footer from "@/components/Layout/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ContactButton from "@/components/ContactButton";

interface ChildrenProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ChildrenProps) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto flex min-h-screen max-w-4xl flex-col px-4 pt-5 pb-40 md:px-16">
        {children}
        <Footer />
        <ScrollToTopButton />
        <ContactButton />
      </div>
      {/* Smooth bottom fade — taller gradient with multi-stop curve to avoid banding.
          Sits above content but below the floating dock (z-100). */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none h-32"
        style={{
          background:
            "linear-gradient(to top, var(--background) 0%, color-mix(in srgb, var(--background) 95%, transparent) 25%, color-mix(in srgb, var(--background) 70%, transparent) 50%, color-mix(in srgb, var(--background) 30%, transparent) 75%, transparent 100%)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          maskImage:
            "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
        }}
      ></div>
    </>
  );
}
