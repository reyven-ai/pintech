import { UserProfileData, UserProfileInput } from "@/types/profile.types";

import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createProfile,
  deleteProfile,
  getProfileProps,
  getSelfProfile,
  updateProfile,
} from "@/services/profile.services";
import { ProfileFormInput } from "@/types/profile.types";
import { ErrorResponse } from "@/types/errors.types";

export const useProfileAction = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate: NavigateFunction = useNavigate();
  const { userId } = useParams();

  const handleCreateProfile = async (formValue: ProfileFormInput) => {
    const {
      username = "",
      description = "",
      country_of_residence = "",
      birth_day = "",
      birth_month = "",
      birth_year = "",
      mobile_phone_number = "",
      mobile_phone_number_prefix = "",
    } = formValue;

    const defaultUsername = username.trim() || "Anonymous";

    let birthdate = "";

    const fullPhoneNumber = mobile_phone_number_prefix + mobile_phone_number;
    if (
      birth_year !== "--" &&
      birth_month !== "--" &&
      birth_day !== "--" &&
      birth_year &&
      birth_month &&
      birth_day
    ) {
      birthdate = `${birth_year}-${birth_month}-${birth_day}`;
    } else {
      birthdate = "";
    }

    const profileToCreate: UserProfileInput = {
      username: defaultUsername,
      description,
      country_of_residence,
      birthdate,
      mobile_phone_number: fullPhoneNumber,
    };

    setMessage("");
    setSuccessful(true);
    setLoading(true);

    try {
      await createProfile(profileToCreate);
      navigate("/");
    } catch (error) {
      handleProfileError(error as ErrorResponse);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = async (formValue: ProfileFormInput) => {
    const {
      username,
      description,
      country_of_residence,
      birth_day,
      birth_month,
      birth_year,
      mobile_phone_number,
      mobile_phone_number_prefix,
    } = formValue;

    let birthdate = "";

    const fullPhoneNumber = mobile_phone_number_prefix + mobile_phone_number;
    if (
      birth_year !== "--" &&
      birth_month !== "--" &&
      birth_day !== "--" &&
      birth_year &&
      birth_month &&
      birth_day
    ) {
      birthdate = `${birth_year}-${birth_month}-${birth_day}`;
    } else {
      birthdate = "";
    }

    const profileToUpdate: UserProfileInput = {
      username,
      description,
      country_of_residence,
      birthdate,
      mobile_phone_number: fullPhoneNumber,
    };

    setMessage("");
    setSuccessful(true);
    setLoading(true);

    try {
      await updateProfile(profileToUpdate);
      navigate(`/profile/${userId}`);
      window.location.reload();
    } catch (error) {
      handleProfileError(error as ErrorResponse);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteProfile = async () => {
    setMessage("");
    setSuccessful(true);
    try {
      await deleteProfile();
      navigate("/signup");
    } catch (error) {
      handleProfileError(error as ErrorResponse);
    }
  };

  const handleProfileError = (error: ErrorResponse) => {
    if (error.response && error.response.status === 401) {
      setMessage("Sorry, You're not authenticated.");
    } else {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
    }
    setSuccessful(false);
  };

  return {
    successful,
    message,
    loading,
    handleCreateProfile,
    handleDeleteProfile,
    handleEditProfile,
  };
};

function transformProfileDataToInput(
  userProfileData: UserProfileData
): UserProfileData {
  return {
    profile_id: userProfileData.profile_id,
    user_id: userProfileData.user_id,
    username: userProfileData.username,
    description: userProfileData.description,
    country_of_residence: userProfileData.country_of_residence,
    mobile_phone_number_prefix: userProfileData.mobile_phone_number_prefix,
    mobile_phone_number: userProfileData.mobile_phone_number,
    birth_day: userProfileData.birth_day,
    birth_month: userProfileData.birth_month,
    birth_year: userProfileData.birth_year,
  };
}

export const useGetProfileProps = () => {
  const [userProfileProps, setUserProfileProps] =
    useState<UserProfileData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (userId) {
          const usersPinsList = await getProfileProps();
          setUserProfileProps(usersPinsList);
        } else {
          console.log("User is not logged in.");
        }
      } catch (error) {
        console.error("Error fetching user pins:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return {
    userProfileProps,
  };
};

export const useGetProfileData = (userId: number) => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const selfProfile = await getSelfProfile(userId);
        const userProfile = transformProfileDataToInput(selfProfile);
        setUserProfile(userProfile || null);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();

    return () => {};
  }, [userId]);

  return {
    userProfile,
  };
};
