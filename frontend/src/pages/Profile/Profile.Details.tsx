// import React, { useState } from "react";
// import UpdateProfileForm from "@/components/Profile/Profile.Update";
// import PinProfile from "@/components/pin/Pin.Profile";
// import SaveList from "@/components/pin/Pin.SaveList";
// import { useParams } from "react-router-dom";
// import { useGetProfileDetails } from "@/hooks/useProfileAction";

// const ProfileDetails: React.FC = () => {
//   const { profileId } = useParams();
//   const { profileDetails } = useGetProfileDetails(profileId || "");
//   const [activeTab, setActiveTab] = useState("created");

//   if (!profileDetails) {
//     return <div>Profile not found</div>;
//   }

//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//   };

//   console.log(profileDetails.profileId);
//   return (
//     <div className=" w-[full] ml-[auto] mt-[1rem] mb-[1rem]pt-[2rem] justify-center gap-[1rem] mt-20">
//       <div className="h-[150px] w-[60%] m-[auto]">
//         <div className="h-[200px] bg-[#e4e6eb] rounded-[8px]"></div>
//         <div className=" mt-[-2.5rem] mb-[2rem] relative flex items-center">
//           <img
//             className="w-[140px] h-[140px] object-cover rounded-[50%] border-2 border-whit ml-[2rem]"
//             src="https://scontent.ftll3-2.fna.fbcdn.net/v/t39.30808-1/405704007_1868000860281104_5391561994519276300_n.jpg?stp=dst-jpg_p720x720&_nc_cat=108&ccb=1-7&_nc_sid=4da83f&_nc_ohc=7nIS0luQLuUAX8hwIUj&_nc_ht=scontent.ftll3-2.fna&oh=00_AfAV_VXU6WWHrCTDseKZT6Ysrt_HdYTjeqYlchsSgg458A&oe=65B47BA5"
//           ></img>
//           <div className="flex justify-between gap-2 ml-2 mt-3">
//             <div>
//               <h2 className="text-[22px] mb-[-3px]">
//                 {profileDetails.username}
//               </h2>
//               {profileDetails.profileId}
//               <p className="mb-[-2px]">{profileDetails.description}</p>
//               <p className="text-[14px] font-semibold text-[#6D6D6D]">
//                 {profileDetails.country_of_residence}
//               </p>
//             </div>
//             <UpdateProfileForm />
//           </div>
//         </div>
//       </div>
//       <div className="w-[83%] mx-[auto] mt-[11%]">
//         <div className="flex items-center justify-center gap-[35px] mb-[2rem]">
//           <span className="text-[18px]">0 posts</span>
//           <span className="text-[18px]">0 followers</span>
//           <span className="text-[18px]">0 following</span>
//         </div>
//         <hr className="h-[2px]" />
//         <ul className="flex gap-[30px] mt-1 justify-center">
//           <li
//             className={`font-semibold cursor-pointer ${
//               activeTab === "created" ? "text-[#3D91FD]" : ""
//             }`}
//             onClick={() => handleTabChange("created")}
//           >
//             Created
//           </li>
//           <li
//             className={`font-semibold cursor-pointer ${
//               activeTab === "saved" ? "text-[#3D91FD]" : ""
//             }`}
//             onClick={() => handleTabChange("saved")}
//           >
//             Saved
//           </li>
//         </ul>
//         {activeTab === "created" && <PinProfile />}
//         {activeTab === "saved" && <SaveList />}
//       </div>
//     </div>
//   );
// };

// export default ProfileDetails;