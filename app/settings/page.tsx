"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { WellnessSidebar } from "@/components/wellness-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Lock, Bell, Palette } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeSection, setActiveSection] = useState<
    "account" | "security" | "notifications" | "appearance"
  >("account");

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  if (isLoading || !user) {
    return <div className="p-6 text-foreground">Loading...</div>;
  }

  const handleProfileUpdate = async () => {
    try {
      await updateProfile({ name });
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const sidebarItems = [
    { id: "account" as const, label: "Account", icon: User },
    { id: "security" as const, label: "Security", icon: Lock },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "appearance" as const, label: "Appearance", icon: Palette },
  ];

  return (
    <>
      <div className="min-h-screen flex bg-emerald-50 dark:bg-emerald-950/10">
        <WellnessSidebar />
        <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account preferences and application behavior
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <nav className="md:col-span-1">
              <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap md:w-full text-left ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>

            <div className="md:col-span-3">
              {activeSection === "account" && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Account</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Manage your profile and personal information
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                        {photo ? (
                          <img src={photo} alt="profile" />
                        ) : (
                          <AvatarFallback className="text-lg bg-muted text-foreground">
                            {user.name?.[0]}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change Photo
                      </Button>
                    </div>

                    <div className="bg-muted/40 p-4 rounded-xl text-sm text-foreground">
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-foreground">Update Name</Label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Button className="w-full" onClick={handleProfileUpdate}>
                        Save Changes
                      </Button>
                    </div>
                    <div className="pt-4">
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeSection === "security" && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Security</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Manage your password and security settings
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-muted/40 rounded-xl">
                      <h3 className="font-medium text-foreground mb-1">
                        Password
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Change your password to keep your account secure.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => router.push("/forgot-password")}
                      >
                        Change Password
                      </Button>
                    </div>
                    <div className="pt-2">
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeSection === "notifications" && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Notifications
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Control how you receive notifications
                    </p>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <Label className="text-foreground">
                      Email Notifications
                    </Label>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </CardContent>
                  <div className="p-4">
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </Card>
              )}

              {activeSection === "appearance" && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Appearance
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Customize how the app looks
                    </p>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <Label className="text-foreground">Dark Mode</Label>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </CardContent>
                  <div className="p-4">
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
