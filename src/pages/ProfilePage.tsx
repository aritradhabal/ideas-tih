import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/getUsers";
import ProfilePageCard from "@/components/ProfilePageCard";

export type User = {
  id: string;
  name: string;
  email: string;
};

const ProfilePage = () => {
  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold">Users</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 2xl:grid-cols-4 place-content-center">
        {users.map((user) => (
          <ProfilePageCard key={user.id} userProfile={user} />
        ))}
      </div>
    </>
  );
};

export default ProfilePage;
