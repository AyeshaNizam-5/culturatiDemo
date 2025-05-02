import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import userService from "@/services/userService"
import { updateUserData } from "@/store/actions/userActions";
import { toast } from "sonner"

import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Eye, EyeOff } from "lucide-react"

const SettingsPage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const [editField, setEditField] = useState(null)
  const [formValues, setFormValues] = useState({
    fullName: `${user.firstName || ""} ${user.lastName || ""}`,
    email: user.email,
    username: user.username,
    phone: user.phone || "",
    language: user.language || "en",
    password: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    try {
      const updated = {}

      if (editField === "fullName") {
        const [firstName, ...lastNameParts] = formValues.fullName.trim().split(" ")
        updated.firstName = firstName
        updated.lastName = lastNameParts.join(" ") || ""
      } else if (editField === "password") {
        if (formValues.newPassword !== formValues.confirmPassword) {
          toast.error("Passwords do not match")
          return
        }
        updated.password = formValues.newPassword
      } else {
        updated[editField] = formValues[editField]
      }

      const response = await userService.update(user.id, updated, user.institutionId)
      dispatch(updateUserData(currentUser.id, updatedData));
      toast.success("Profile updated")
    //   setEditField(null)
    } catch (error) {
      toast.error("Failed to update user")
    } finally {
      setConfirming(false)
    }
  }

  const renderRow = (label, field, isPassword = false) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      {editField === field ? (
        <>
          {field === "language" ? (
            <Select value={formValues.language} onValueChange={(val) => handleChange("language", val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="tr">Turkish</SelectItem>
              </SelectContent>
            </Select>
          ) : field === "password" ? (
            <>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Current Password"
                value={formValues.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={formValues.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
              />
              <Button variant="ghost" onClick={() => setShowPassword(!showPassword)} className="mt-1">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </>
          ) : (
            <Input
              type={isPassword ? "password" : "text"}
              value={formValues[field]}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="mt-2" onClick={() => setConfirming(true)}>
                Save
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to save changes?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                    setConfirming(false)
                    setEditField(null) // ← reset field even if user cancels
                }}
                >
                No
                </AlertDialogCancel>

                <AlertDialogAction
                onClick={async () => {
                    setConfirming(false)
                    const success = await handleSave()
                    setEditField(null) // ← always reset field regardless of success
                }}
                >
                Yes
                </AlertDialogAction>



              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">
            {isPassword ? "••••••••" : formValues[field]}
          </span>
          <Button size="sm" onClick={() => setEditField(field)}>Change</Button>
        </div>
      )}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderRow("Full Name", "fullName")}
        {renderRow("Username", "username")}
        {renderRow("Email", "email")}
        {renderRow("Phone", "phone")}
        {renderRow("Password", "password", true)}
        {renderRow("Language", "language")}
      </CardContent>
    </Card>
  )
}

export default SettingsPage
