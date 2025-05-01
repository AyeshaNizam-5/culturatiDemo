import InstitutionProfileCard from "@/components/InstitutionProfileCard";
import { useSelector } from "react-redux";


const AboutInstitution = () => {
  const { role } = useSelector(state => state.auth);

  const mockInstitution = {
    institutionName: "National Museum of History",
    institutionCode: "NMH001",
    type: "Museum",
    address: "123 History Ave, Oldtown",
    about: "One of the oldest and most visited museums in the country.",
    logo: "https://placehold.co/150x150",
    image: "https://placehold.co/800x400",
    funFacts: [{ text: "Founded in 1901" }, { text: "Over 1 million artifacts" }],
  };

  const handleSubmit = (updatedInstitution) => {
    console.log("Updated institution:", updatedInstitution);
    // optionally sync to backend here
  };

  return (
    <div className="p-6">
      <InstitutionProfileCard
        institution={mockInstitution}
        onSubmit={handleSubmit}
        editable={true}
      />
    </div>
  );
};

export default AboutInstitution;
