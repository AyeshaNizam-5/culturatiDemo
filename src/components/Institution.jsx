import React, { useState } from "react";
import InstitutionForm from "../components/InstitutionForm";
import InstitutionProfileCard from "../components/InstitutionProfileCard";
import { useOutletContext } from "react-router-dom";
import institutionService from "../services/institutionService";

const Institution = () => {
  const { institution, refreshInstitution } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);

  if (!institution) return <p>Loading...</p>;
  console.log("Institution data:", institution);  
  const handleUpdate = async (formData) => {
    try {
      await institutionService.update(institution.id, formData);
      await refreshInstitution();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating institution:", error);
    }
  };

  return (
    <>
      <InstitutionProfileCard
        institution={institution}
        onSubmit={handleUpdate}
        onEdit={() => setIsEditing(true)}
      />
      {isEditing && (
        <InstitutionForm
          institution={institution}
          onClose={() => setIsEditing(false)}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
};

export default Institution;
