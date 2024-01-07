import { UserPinRepository } from "./pin.repository";
import { UserPinData } from "./pin.types";

export async function add(data: UserPinData): Promise<UserPinData> {
  try {
    const pinRepository = new UserPinRepository();
    const createdUserPin: UserPinData = await pinRepository.createUserPin(
      data.user_id,
      data.description,
      data.image_url,
      data.created_at
    );

    return createdUserPin;
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading user pin.");
  }
}
