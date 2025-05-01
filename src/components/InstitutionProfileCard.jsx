"use client"

import React, { useState } from "react";
import { Pencil } from "lucide-react";
import InstitutionForm from "./InstitutionForm";
import { Button } from "@/components/ui/button";

const InstitutionProfileCard = ({ institution, onSubmit, editable = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  if (!institution) return null;

  const handleUpdate = (data) => {
    onSubmit(data);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#cde4ed]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0b6085]">Institution Info</h1>
        {editable && (
          <Button onClick={() => setIsEditing(true)} className="flex gap-2">
            <Pencil size={18} /> Edit Info
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="font-semibold text-[#0b6085]">Name:</p>
          <p className="text-[#6193a9]">{institution.institutionName}</p>
        </div>
        <div>
          <p className="font-semibold text-[#0b6085]">Code:</p>
          <p className="text-[#6193a9]">{institution.institutionCode}</p>
        </div>
        <div>
          <p className="font-semibold text-[#0b6085]">Type:</p>
          <p className="text-[#6193a9]">{institution.type}</p>
        </div>
        <div>
          <p className="font-semibold text-[#0b6085]">Address:</p>
          <p className="text-[#6193a9]">{institution.address}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-[#0b6085]">About:</p>
        <p className="text-[#6193a9]">{institution.about}</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-[#0b6085] mb-1">Fun Facts:</p>
        <ul className="list-disc list-inside text-[#6193a9]">
          {institution.funFacts?.map((fact, idx) => (
            <li key={idx}>{fact.text}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-6 mt-4 flex-wrap">
        {institution.logo && (
          <img
            src={
              typeof institution.logo === "string"
                ? institution.logo
                : URL.createObjectURL(institution.logo)
            }
            alt="Logo"
            className="w-24 h-24 object-cover rounded-lg border"
          />
        )}
        {institution.image && (
          <img
            src={
              typeof institution.image === "string"
                ? institution.image
                : URL.createObjectURL(institution.image)
            }
            alt="Cover"
            className="w-64 h-32 object-cover rounded-lg border"
          />
        )}
      </div>

      {isEditing && (
        <InstitutionForm
          institution={institution}
          onClose={() => setIsEditing(false)}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
};

export default InstitutionProfileCard;
