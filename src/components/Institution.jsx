import React, { useState } from "react";
import InstitutionForm from "../components/InstitutionForm";
import InstitutionProfileCard from "../components/InstitutionProfileCard";
import { useOutletContext } from "react-router-dom";

const Institution = () => {
  const { institution, refreshInstitution } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);

  if (!institution) return <p>Loading...</p>;

  return (
    <>
      <InstitutionProfileCard
        institution={institution}
        onEdit={() => setIsEditing(true)}
      />
      {isEditing && (
        <InstitutionForm
          institution={institution}
          onClose={() => setIsEditing(false)}
          onSubmit={refreshInstitution}
        />
      )}
    </>
  );
};

export default Institution;
