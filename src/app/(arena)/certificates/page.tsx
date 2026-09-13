"use client";

import ComingSoon from "@/components/Blog/ComingSoon";
import Cd from "@/components/Miscellaneous/Cd";

export default function CertificatesPage() {
  return (
    <div className="flex flex-col min-h-[70vh] px-4">
      <div className="flex-1 flex flex-col items-center justify-center">
        <ComingSoon
          title="Coming Soon"
          subtitle="Certificates page is under construction."
        />
      </div>
      <Cd />
    </div>
  );
}
