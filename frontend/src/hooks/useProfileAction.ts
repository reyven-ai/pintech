import { ErrorResponse, UserProfileInput } from '@/types/user.types';

import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  createProfile,
  deleteProfile,
  updateProfile,
} from '@/components/services/user.services';
import { CreateProfileFormInput } from '@/types/profile.types';

export const useProfileAction = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const navigate: NavigateFunction = useNavigate();

  const handleCreateProfile = async (formValue: CreateProfileFormInput) => {
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

    const fullPhoneNumber = mobile_phone_number_prefix + mobile_phone_number;
    const birthdate = `${birth_year}-${birth_month}-${birth_day}`;

    const profileToCreate: UserProfileInput = {
      username,
      description,
      country_of_residence,
      birthdate,
      mobile_phone_number: fullPhoneNumber,
    };

    setMessage('');
    setSuccessful(true);
    try {
      await createProfile(profileToCreate);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      handleProfileError(error as ErrorResponse);
    }
  };

  const handleEditProfile = async (formValue: UserProfileInput) => {
    const {
      username,
      description,
      country_of_residence,
      birthdate,
      mobile_phone_number,
    } = formValue;

    setMessage('');
    setSuccessful(true);
    try {
      await updateProfile(
        username,
        description,
        country_of_residence,
        birthdate,
        mobile_phone_number
      );
      setTimeout(() => {
        navigate('/editprofile');
      }, 1500);
      console.log('Updated Successful?');
    } catch (error) {
      handleProfileError(error as ErrorResponse);
    }
  };

  const handleDeleteProfile = async () => {
    setMessage('');
    setSuccessful(true);
    try {
      await deleteProfile();
      setTimeout(() => {
        navigate('/signup');
      }, 1500);
      console.log('Deleted Succesful!', handleDeleteProfile);
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
    handleCreateProfile,
    handleDeleteProfile,
    handleEditProfile,
  };
};
