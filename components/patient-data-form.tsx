"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { PatientData } from "@/app/page"
import { User, Activity, FlaskConical, Stethoscope } from "lucide-react"

interface PatientDataFormProps {
  onSubmit: (data: PatientData) => void
}

export function PatientDataForm({ onSubmit }: PatientDataFormProps) {
  const [formData, setFormData] = useState<PatientData>({
    demographics: {
      age: 45,
      gender: "Female",
      bmi: 28.5,
    },
    vitals: {
      systolicBP: 140,
      diastolicBP: 90,
      heartRate: 78,
      temperature: 98.6,
      oxygenSaturation: 98,
    },
    labs: {
      hemoglobin: 12.5,
      whiteBloodCells: 7.2,
      platelets: 250,
      creatinine: 1.1,
      glucose: 110,
    },
    comorbidities: ["Hypertension"],
    surgeryType: "Orthopedic",
    surgeryComplexity: "Moderate",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleComorbidityChange = (comorbidity: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      comorbidities: checked
        ? [...prev.comorbidities, comorbidity]
        : prev.comorbidities.filter((c) => c !== comorbidity),
    }))
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <User className="h-6 w-6" />
          Patient Data Input
        </CardTitle>
        <CardDescription className="text-blue-100">
          Enter comprehensive patient information for AI-powered risk assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Demographics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b border-gray-200 pb-2">
              <User className="h-5 w-5 text-blue-600" />
              Demographics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.demographics.age}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      demographics: { ...prev.demographics, age: Number.parseInt(e.target.value) },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.demographics.gender}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      demographics: { ...prev.demographics, gender: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bmi">BMI</Label>
                <Input
                  id="bmi"
                  type="number"
                  step="0.1"
                  value={formData.demographics.bmi}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      demographics: { ...prev.demographics, bmi: Number.parseFloat(e.target.value) },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Vitals */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b border-gray-200 pb-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Vital Signs
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="systolic">Systolic BP (mmHg)</Label>
                <Input
                  id="systolic"
                  type="number"
                  value={formData.vitals.systolicBP}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vitals: { ...prev.vitals, systolicBP: Number.parseInt(e.target.value) },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="diastolic">Diastolic BP (mmHg)</Label>
                <Input
                  id="diastolic"
                  type="number"
                  value={formData.vitals.diastolicBP}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vitals: { ...prev.vitals, diastolicBP: Number.parseInt(e.target.value) },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input
                  id="heartRate"
                  type="number"
                  value={formData.vitals.heartRate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vitals: { ...prev.vitals, heartRate: Number.parseInt(e.target.value) },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="oxygen">O2 Saturation (%)</Label>
                <Input
                  id="oxygen"
                  type="number"
                  value={formData.vitals.oxygenSaturation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vitals: { ...prev.vitals, oxygenSaturation: Number.parseInt(e.target.value) },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Lab Values */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b border-gray-200 pb-2">
              <FlaskConical className="h-5 w-5 text-blue-600" />
              Laboratory Values
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hemoglobin">Hemoglobin (g/dL)</Label>
                <Input
                  id="hemoglobin"
                  type="number"
                  step="0.1"
                  value={formData.labs.hemoglobin}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      labs: { ...prev.labs, hemoglobin: Number.parseFloat(e.target.value) },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="wbc">WBC (×10³/μL)</Label>
                <Input
                  id="wbc"
                  type="number"
                  step="0.1"
                  value={formData.labs.whiteBloodCells}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      labs: { ...prev.labs, whiteBloodCells: Number.parseFloat(e.target.value) },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="platelets">Platelets (×10³/μL)</Label>
                <Input
                  id="platelets"
                  type="number"
                  value={formData.labs.platelets}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      labs: { ...prev.labs, platelets: Number.parseInt(e.target.value) },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="creatinine">Creatinine (mg/dL)</Label>
                <Input
                  id="creatinine"
                  type="number"
                  step="0.1"
                  value={formData.labs.creatinine}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      labs: { ...prev.labs, creatinine: Number.parseFloat(e.target.value) },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Comorbidities */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 border-b border-gray-200 pb-2">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              Comorbidities
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {["Diabetes", "Hypertension", "Heart Disease", "COPD", "Kidney Disease", "Obesity"].map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={formData.comorbidities.includes(condition)}
                    onCheckedChange={(checked) => handleComorbidityChange(condition, checked as boolean)}
                  />
                  <Label htmlFor={condition}>{condition}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Surgery Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Surgery Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="surgeryType">Surgery Type</Label>
                <Select
                  value={formData.surgeryType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, surgeryType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Orthopedic">Orthopedic</SelectItem>
                    <SelectItem value="Cardiac">Cardiac</SelectItem>
                    <SelectItem value="General">General Surgery</SelectItem>
                    <SelectItem value="Neurological">Neurological</SelectItem>
                    <SelectItem value="Vascular">Vascular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="complexity">Complexity</Label>
                <Select
                  value={formData.surgeryComplexity}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, surgeryComplexity: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg"
          >
            Generate AI Risk Assessment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
