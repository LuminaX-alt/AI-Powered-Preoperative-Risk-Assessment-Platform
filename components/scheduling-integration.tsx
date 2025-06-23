"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { RiskAssessment, PatientData } from "@/app/page"
import { Calendar, Clock, MapPin, Users, AlertTriangle, CheckCircle } from "lucide-react"

interface SchedulingIntegrationProps {
  assessment: RiskAssessment
  patientData: PatientData
}

export function SchedulingIntegration({ assessment, patientData }: SchedulingIntegrationProps) {
  const [selectedSlot, setSelectedSlot] = useState<string>("")
  const [schedulingStatus, setSchedulingStatus] = useState<"idle" | "scheduling" | "scheduled">("idle")

  const getRecommendedTimeSlots = () => {
    // Based on risk assessment, recommend optimal scheduling
    const baseSlots = [
      { id: "1", time: "07:30 AM", date: "2024-01-15", room: "OR-1", team: "Team A" },
      { id: "2", time: "09:00 AM", date: "2024-01-15", room: "OR-2", team: "Team B" },
      { id: "3", time: "11:30 AM", date: "2024-01-15", room: "OR-3", team: "Team C" },
      { id: "4", time: "02:00 PM", date: "2024-01-16", room: "OR-1", team: "Team A" },
    ]

    return baseSlots.map((slot) => ({
      ...slot,
      recommended: assessment.overallRisk === "High" ? slot.time === "07:30 AM" : true,
      reason:
        assessment.overallRisk === "High"
          ? "Early morning slot recommended for high-risk patients"
          : "Standard scheduling available",
    }))
  }

  const getRequiredResources = () => {
    const resources = []

    if (assessment.mortalityRisk > 5) {
      resources.push("ICU bed reserved")
    }
    if (assessment.bleedingRisk > 8) {
      resources.push("Blood bank notification")
    }
    if (assessment.infectionRisk > 10) {
      resources.push("Enhanced sterile setup")
    }
    if (patientData.demographics.bmi > 35) {
      resources.push("Bariatric equipment")
    }

    return resources
  }

  const handleSchedule = () => {
    setSchedulingStatus("scheduling")
    setTimeout(() => {
      setSchedulingStatus("scheduled")
    }, 2000)
  }

  const timeSlots = getRecommendedTimeSlots()
  const requiredResources = getRequiredResources()

  return (
    <div className="space-y-6">
      {/* Risk-Based Scheduling Alert */}
      <Card
        className={`border-0 shadow-lg ${
          assessment.overallRisk === "High"
            ? "bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-l-red-500"
            : assessment.overallRisk === "Moderate"
              ? "bg-gradient-to-r from-amber-50 to-yellow-100 border-l-4 border-l-amber-500"
              : "bg-gradient-to-r from-green-50 to-emerald-100 border-l-4 border-l-green-500"
        }`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <AlertTriangle className="h-6 w-6" />
            LuminaX-alt Scheduling Intelligence
          </CardTitle>
          <CardDescription className="text-gray-600">
            AI-optimized scheduling based on {assessment.overallRisk.toLowerCase()} risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assessment.overallRisk === "High" && (
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900">High-Risk Patient Protocol</p>
                  <p className="text-red-800 text-sm">
                    Schedule during peak staffing hours (7:30-11:30 AM) with senior surgical team
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
              <div>
                <p className="font-semibold">Estimated Surgery Duration</p>
                <p className="text-sm text-muted-foreground">
                  {patientData.surgeryComplexity === "High"
                    ? "4-6 hours"
                    : patientData.surgeryComplexity === "Moderate"
                      ? "2-4 hours"
                      : "1-2 hours"}
                  {assessment.overallRisk === "High" && " (+ 30 min buffer for high-risk)"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Available Surgery Slots
          </CardTitle>
          <CardDescription>Optimized scheduling based on patient risk profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeSlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 border-0 rounded-xl cursor-pointer transition-all duration-200 shadow-md ${
                  selectedSlot === slot.id
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-[1.02]"
                    : "bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 hover:shadow-lg"
                } ${!slot.recommended ? "opacity-60" : ""}`}
                onClick={() => setSelectedSlot(slot.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold">{slot.date}</p>
                      <p className="text-sm text-muted-foreground">{slot.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{slot.room}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{slot.team}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {slot.recommended && (
                      <Badge variant="default">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    )}
                    {selectedSlot === slot.id && <Badge variant="secondary">Selected</Badge>}
                  </div>
                </div>
                {slot.reason && <p className="text-xs text-muted-foreground mt-2">{slot.reason}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Required Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Required Resources & Preparations</CardTitle>
          <CardDescription>Additional resources needed based on risk assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requiredResources.length > 0 ? (
              requiredResources.map((resource, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{resource}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Standard surgical setup required</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scheduling Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Surgery</CardTitle>
          <CardDescription>Confirm scheduling with integrated hospital system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedulingStatus === "scheduled" ? (
              <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6" />
                  <div>
                    <p className="font-semibold text-lg">Surgery Scheduled Successfully</p>
                    <p className="text-green-100 text-sm mt-1">
                      LuminaX-alt has allocated all required resources and sent team notifications.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <Button
                  onClick={handleSchedule}
                  disabled={!selectedSlot || schedulingStatus === "scheduling"}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 shadow-lg"
                >
                  {schedulingStatus === "scheduling" ? "Processing with LuminaX-alt..." : "Schedule with LuminaX-alt"}
                </Button>
                <Button variant="outline">Send to Scheduling Team</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
