"use client";

import { useEffect, useState, Suspense  } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import Loading from "../loading";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  // const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
      setUserName(()=> searchParams.get("name"));
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Suspense fallback={<Loading />}>
        <Profile
          name={userName}
          desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
          data={userPosts}
        />
    </Suspense>
  );
};

export default UserProfile;
