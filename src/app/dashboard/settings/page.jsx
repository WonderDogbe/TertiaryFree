import { AccountSettingsCard } from "@/components/student-dashboard/settings/AccountSettingsCard";
import { AppearanceSettingsCard } from "@/components/student-dashboard/settings/AppearanceSettingsCard";
import { NotificationPreferencesCard } from "@/components/student-dashboard/settings/NotificationPreferencesCard";
import { ProfileSettingsCard } from "@/components/student-dashboard/settings/ProfileSettingsCard";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ProfileSettingsCard />
        <NotificationPreferencesCard />
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AppearanceSettingsCard />
        <AccountSettingsCard />
      </section>
    </div>
  );
}
