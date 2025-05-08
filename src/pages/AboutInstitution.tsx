import InstitutionProfileCard from "@/components/InstitutionProfileCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from '../store';
import institutionService from "@/services/institutionService";

const AboutInstitution = () => {
  const { role } = useSelector((state: RootState) => state.auth);

  const [institution, setInstitution] = useState();

  const fetchInstitutionData = async () => {
    try {
      const response = await institutionService.getById();
      setInstitution(response.data);
    } catch (error) {
      console.error("Error fetching institution data:", error);
    }
  }

  useEffect(() => {
    fetchInstitutionData();
  }, []);

  const handleSubmit = () => {
    // optionally sync to backend here
  };

  return (
    <div className="p-6">
      <InstitutionProfileCard
        institution={institution}
        onSubmit={handleSubmit}
        editable={true}
      />
    </div>
  );
};

export default AboutInstitution;
