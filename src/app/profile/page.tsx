// src/app/profile/page.tsx

import type { Metadata } from "next";
import { ProfileClient } from "@/components/profile/ProfileClient";

export const metadata: Metadata = {
  title: "My Profile | KenaKata.com",
  description: "View and edit your account information.",
};

export default function ProfilePage() {
  return (
    <div className="container py-8">
      <ProfileClient />
    </div>
  );
}
