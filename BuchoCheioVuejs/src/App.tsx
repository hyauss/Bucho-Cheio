import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { UserNavigation } from "./components/UserNavigation";
import { RestaurantNavigation } from "./components/RestaurantNavigation";
import { Toaster } from "./components/ui/sonner";

type UserType = 'seeker' | 'restaurant' | null;

export default function App() {
  const [userType, setUserType] = useState<UserType>(null);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
  };

  const handleBack = () => {
    setUserType(null);
  };

  return (
    <>
      {userType === null && (
        <LandingPage onUserTypeSelect={handleUserTypeSelect} />
      )}
      
      {userType === 'seeker' && (
        <UserNavigation onBack={handleBack} />
      )}
      
      {userType === 'restaurant' && (
        <RestaurantNavigation onBack={handleBack} />
      )}
      
      <Toaster />
    </>
  );
}