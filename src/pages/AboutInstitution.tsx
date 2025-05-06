import InstitutionProfileCard from "@/components/InstitutionProfileCard";
import { useSelector } from "react-redux";
import { m3, m4 } from '../assets';


const AboutInstitution = () => {
  const { role } = useSelector(state => state.auth);

  

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
