import InstitutionProfileCard from "@/components/InstitutionProfileCard";
import { useSelector } from "react-redux";
import { m3, m4 } from '../assets';


const AboutInstitution = () => {
  const { role } = useSelector(state => state.auth);

  const mockInstitution = {
    institutionName: "National Museum of History",
    institutionCode: "NMH001",
    type: "Museum",
    address: "123 History Ave, Oldtown",
    about: "One of the oldest and most visited museums in the country.",
    logo: m3,
    image: m4,
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
